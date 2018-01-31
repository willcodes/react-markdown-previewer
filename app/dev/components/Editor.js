//main logic for editor lives here.

import React from "react";
import Modal from "./Modal";
import Nav from "./Nav";
import marked from "marked";
import fileSave from "file-saver";
import config from "../config";

import brace from 'brace';
import AceEditor from 'react-ace';
 
import 'brace/mode/markdown';
import 'brace/theme/github';
//temporary, must move to config

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
    
    if (id) {
      console.log(id, "hit");
      var request = new Request(`${config.base_url}/${id}`, {
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
    return new Request(`${config.base_url}/save`, {
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
    return new Request(`${config.base_url}/save`, {
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

  testing = () => {
    
  }

  //save to redis -> maybe should abstract this somehow
  saveDocument = () => {
    const { id } = this.props.match.params;
    if (id) {
      fetch(this.saveExisting())
        .then(res => res)
        .then(() => {
          this.setState({
            modalText: "Your document has been saved.",
            lastSaved: Date.now()
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
      let parsedMarkdown = marked(value, { sanitize: true, breaks:true });
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
          lastSave={this.state.lastSaved}
        />
        <div className="container">
          <div className="flex-container">
            <div
              className="half-container"
              dangerouslySetInnerHTML={output(this.state.value)}
            />
            {/* <textarea
              className="half-container"
              rows="20"
              cols="50"
              value={value}
              onKeyDown={event => this.handleKeyDown(event)}
              onChange={event => this.setState({ value: event.target.value })}
            /> */}
            <AceEditor
              className="half-container"
              mode="markdown"
              theme="github"
              value={value}
              onKeyDown={event => this.handleKeyDown(event)}
              onChange={event => this.setState({ value: event })}
              name="editor"
              fontSize={13}
              width="50vw"
            />,
          </div>
        </div>
      </main>
    );
  }
}

export default Editor;
