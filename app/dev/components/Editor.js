//main logic for editor lives here.

import React from "react";
import Modal from "./Modal";
import Nav from "./Nav";
import marked from "marked";
import fileSave from "file-saver";
import config from "../config";
import Dialog from 'material-ui/Dialog';

//temporary, must move to config

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      modelText: "",
      modalOpen: false,
      lastSaved: null,
      modalShouldShow: false
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({
      lastSaved: null,
      modalShouldShow: id ? true : false
    });
  }

  componentDidMount() {
    this.setState({
      lastSaved: null
    });
  }

  componentWillMount() {
    const { id } = this.props.match.params;

    if (id) {
      console.log(id, "hit");
      var request = new Request(
        `${config.base_url + config.public_route}/${id}`,
        {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json"
          })
        }
      );
      fetch(request)
        .then(res => res.text())
        .then(res => {
          res !== ""
            ? this.setState({
                value: res
              })
            : this.setState({
                value: config.default_text
              });
        });
    } else {
      this.setState({
        value: config.default_text
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { id } = this.props.match.params;
    if (id && this.state.value != prevState.value && this.state.value != config.default_text) {
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

  handleModalOpen = () => {
    this.setState({modalOpen: true});
  };

  handleModalClose = () => {
    this.setState({modalOpen: false});
  };

  //uses filesave package
  saveToFile = file => {
    fileSave.saveAs(file);
  };

  saveExisting = () => {
    const { id } = this.props.match.params;
    return new Request(`${config.base_url + config.public_route}/save`, {
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
    return new Request(`${config.base_url + config.public_route}/save`, {
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

  saveDocument = () => {
    const { id } = this.props.match.params;
    if (id) {
      fetch(this.saveExisting())
        .then(res => res)
        .then(() => {
          this.setState({
            modalText: "Your document has been saved!",
            lastSaved: Date.now()
          });
          this.handleModalOpen();
        });
    } else {
      let randomHash = Math.random()
        .toString(36)
        .substring(3);

      fetch(this.saveNew(randomHash)).then(res => {
        this.props.history.push("/pads/" + randomHash);
      });
    }
  };

  render() {
    //returns html after marked.js package parses
    let output = value => {
      let parsedMarkdown = marked(value, { sanitize: true, breaks: true });
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
          title={this.state.modalText}
          close={this.handleModalClose}
          open={this.state.modalOpen}
        />
        <Nav
          saveFile={this.saveToFile}
          markdownFile={markdownFile}
          htmlFile={htmlFile}
          saveDocument={this.saveDocument}
          lastSave={this.state.lastSaved}
        />
        <div className="container">
          <div className="flex-container">
            <div
              className="half-container preview-container"
              dangerouslySetInnerHTML={output(this.state.value)}
            />
            <textarea
              className="half-container"
              rows="20"
              cols="50"
              value={value}
              onKeyDown={event => this.handleKeyDown(event)}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default Editor;
