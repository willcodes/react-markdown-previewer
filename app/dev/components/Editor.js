//main logic for editor lives here.

import React from "react";
import Modal from "./Modal";
import Nav from "./Nav";
import marked from "marked";
import fileSave from "file-saver";

//temporary, must move to config
const endpoint = "http://localhost:3003";

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      modelText: "",
      modalShouldShow: false,
      lastSaved: null
    };
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    let defaultText =
      "## Quick Guide\n---\n>Instructions:\n>1. Type markdown on the left.\n2. View markup on the right.\n3. Save to disk or online for editing later.\n\n**Saving  Online**:\n\nFiles are stored online, however anyone with the link can access them. This application is meant for quick writing and sharing, not a cloud based storage solution.\n\nCopy the URL after you hit *SAVE ONLINE* to share or edit from another computer. \n\n**Learn More**:\n\nLearn how to use markdown here: **[How To Markdown](http://www.markdowntutorial.com/)**\n\n**Built with the help of:**\n- Reactjs\n- Nodejs\n- Markedjs\n- Redis\n- [Marked Custom Styles](https://github.com/ttscoff/MarkedCustomStyles)";
    if (id) {
      console.log(id, "hit");
      var request = new Request(`${endpoint}/${id}`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json"
        })
      });
      fetch(request)
        .then(res => res.text())
        .then(res => {
          res !== ""
            ? this.setState({
                value: res
              })
            : this.setState({
                value: defaultText
              });
        });
    } else {
      this.setState({
        value: defaultText
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { id } = this.props.match.params;
    if (id && this.state.value != prevState.value) {
      fetch(this.saveExisting())
        .then(res => res)
        .then(() => {
          this.setState({
            lastSaved: Date.now()
          });
        });
    }
  }

  handleKeyDown = event => {
    let charCode = String.fromCharCode(event.which).toLocaleLowerCase();
    if (
      (event.ctrlKey && charCode === "s") ||
      (event.metaKey && charCode === "s")
    ) {
      event.preventDefault();
      this.saveDocument();
    }
  };

  showModal = () => {
    this.setState({
      modalShouldShow: true
    });

    document.onclick = () => {
      this.setState({
        modalShouldShow: false
      });
    };
  };

  //uses filesave package
  saveToFile = file => {
    fileSave.saveAs(file);
  };

  saveExisting = () => {
    const { id } = this.props.match.params;
    return new Request(`${endpoint}/save`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        docName: id,
        docContent: this.state.value
      })
    });
  };

  saveNew = randomHash => {
    return new Request(`${endpoint}/save`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        docName: randomHash,
        docContent: this.state.value
      })
    });
  };

  //save to redis -> maybe should abstract this somehow
  saveDocument = () => {
    const { id } = this.props.match.params;
    if (id) {
      fetch(this.saveExisting())
        .then(res => res)
        .then(() => {
          this.setState({
            modalText: "Your document has been saved."
          });
          this.showModal();
        });
    } else {
      let randomHash = Math.random()
        .toString(36)
        .substring(3);

      fetch(this.saveNew(randomHash)).then(res => {
        this.props.history.push("/" + randomHash);
      });
    }
  };

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

    const { modalText, modalShouldShow, value } = this.state;

    return (
      <main>
        <Modal
          modalText={modalText}
          modalClass={modalShouldShow ? "modalShow" : null}
        />
        <Nav
          saveFile={this.saveToFile}
          markdownFile={markdownFile}
          htmlFile={htmlFile}
          saveDocument={this.saveDocument}
        />
        <div className="container">
          <div className="flex-container">
            <textarea
              className="half-container"
              rows="20"
              cols="50"
              value={value}
              onKeyDown={event => this.handleKeyDown(event)}
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
