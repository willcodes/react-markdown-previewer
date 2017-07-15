//main logic for editor lives here.

import React from "react";
import Modal from "./Modal";
import marked from "marked";
import fileSave from "file-saver";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this._handleKeyDown = this._handleKeyDown.bind(this);

    this.state = {
      value: "",
      modelText: "",
      modalShouldShow: false
    };
  }

  componentDidMount() {
    let defaultText =
      "## Quick Guide\n---\n>Instructions:\n>1. Type markdown on the left.\n2. View markup on the right.\n3. Save to disk or online for editing later.\n\n**Saving  Online**:\n\nFiles are stored online, however anyone with the link can access them. This application is meant for quick writing and sharing, not a cloud based storage solution.\n\nCopy the URL after you hit *SAVE ONLINE* to share or edit from another computer. \n\n**Learn More**:\n\nLearn how to use markdown here: **[How To Markdown](http://www.markdowntutorial.com/)**\n\n**Built with the help of:**\n- Reactjs\n- Nodejs\n- Markedjs\n- Redis\n- [Marked Custom Styles](https://github.com/ttscoff/MarkedCustomStyles)";

    if (window.location.search.indexOf("?query=") > -1) {
      var id = window.location.search.split("?query=")[1];

      fetch("/" + id)
        .then(res => {
          return res.text();
        })
        .then(myRes => {
          if (myRes !== "") {
            this.setState({
              value: myRes
            });
          } else {
            this.setState({
              value: defaultText
            });
          }
        });
    } else {
      this.setState({
        value: defaultText
      });
    }
  }

  _handleKeyDown(event) {
    let charCode = String.fromCharCode(event.which).toLocaleLowerCase();
    if (
      (event.ctrlKey && charCode === "s") ||
      (event.metaKey && charCode === "c")
    ) {
      event.preventDefault();
      this._saveDocument();
    }
  }

  _showModal() {
    this.setState({
      modalShouldShow: true
    });

    document.onclick = () => {
      this.setState({
        modalShouldShow: false
      });
    };
  }

  //uses filesave package
  _saveToFile(file) {
    fileSave.saveAs(file);
  }

  //save to redis -> maybe should abstract this somehow
  _saveDocument() {
    let shouldSave = window.location.search.indexOf("?query=");
    if (shouldSave !== -1) {
      console.log(window.location.search.indexOf("?query="));
      let docName = window.location.search.split("?query=")[1];

      let request = new Request("/save", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({
          docName,
          docContent: this.state.value
        })
      });

      fetch(request).then(function(res) {
        console.log(res);
      });
      //this should be called after fetch but could not figure out how to bind 'this'
      this.setState({
        modalText: "Your document has been saved."
      });
      this._showModal();
    } else {
      let randomHash = Math.random().toString(36).substring(7);

      let request = new Request("/save", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({
          docName: randomHash,
          docContent: this.state.value
        })
      });

      fetch(request).then(res => {
        window.location = "?query=" + randomHash;
      });
    }
  }

  render() {
    //returns html after marked.js package parses
    let output = value => {
      let parsedMarkdown = marked(value, { sanitize: true });
      return {
        __html: parsedMarkdown
      };
    };
    //md and html files using filesave
    let markdownFile = new File([this.state.value], "markdown.md", {
      type: "text/plain;charset=utf-8"
    });
    let htmlFile = new File([marked(this.state.value)], "markdown.html", {
      type: "text/plain;charset=utf-8"
    });

    return (
      <main>
        <Modal
          modalText={this.state.modalText}
          modalClass={this.state.modalShouldShow ? "modalShow" : null}
        />
        <nav className="nav">
          <a href="/" className="logo">
            Markdown Pad
          </a>
          <span className="tagline">
            A quick solution to rapidly write and save markdown.
          </span>
          <ul className="saveButtons">
            <li>
              <a
                href="#"
                onClick={() => {
                  this._saveToFile(markdownFile);
                }}
              >
                save as markdown
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => {
                  this._saveToFile(htmlFile);
                }}
              >
                save as html
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => {
                  this._saveDocument();
                }}
              >
                save online
              </a>
            </li>
          </ul>
        </nav>
        <div className="container">
          <div className="flex-container">
            <textarea
              className="half-container"
              rows="20"
              cols="50"
              value={this.state.value}
              onKeyDown={event => this._handleKeyDown(event)}
              onChange={event => this.setState({ value: event.target.value })}
            />
            <div
              className="half-container"
              dangerouslySetInnerHTML={output(this.state.value)}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default Editor;
