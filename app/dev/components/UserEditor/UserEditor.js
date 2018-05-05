//main logic for UserEditor lives here.

import React from "react";
import Modal from "../Modal/Modal";
import Nav from "../Nav/Nav";
import marked from "marked";
import fileSave from "file-saver";
import config from "../../config";
import Title from "../Title/Title";
import Dialog from "material-ui/Dialog";
import axios from "axios";
import { Redirect } from "react-router-dom";

import "./UserEditor.css";
import brace from "brace";
import AceEditor from "react-ace";

import "brace/mode/markdown";
import "brace/theme/github";

class UserEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      value: "",
      modelText: "",
      modalOpen: false,
      lastSaved: null,
      modalShouldShow: false,
      showCopyButton: true
    };
  }
  componentDidMount() {
    const { id } = this.props.location.state;
    this.setState({
      lastSaved: null,
      modalShouldShow: id ? true : false
    });

    setInterval(this.save, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.save);
  }

  componentWillMount() {
    const { id } = this.props.location.state;
    axios
      .get(`${config.base_url}/api/documents/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(res => {
        if (res.status == 200) {
          this.setState({
            value: res.data.content,
            title: res.data.title
          });
        }
      })
      .catch(err => {
        this.setState({
          modalText:
            "Sorry, you do not own this document -> redirecting to dashboard.",
          modalOpen: true,
          err: true
        });
      });
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

  saveDocument = () => {
    this.save();
    this.handleModalOpen();
  };

  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleModalClose = () => {
    if (this.state.err) {
      return this.props.history.push("/user/dashboard");
    }
    this.setState({ modalOpen: false });
  };

  //uses filesave package
  saveToFile = file => {
    fileSave.saveAs(file);
  };

  save = async () => {
    const { id } = this.props.location.state;
    const req = new Request(`${config.base_url}/api/documents/save`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }),
      body: JSON.stringify({
        id: id,
        content: this.state.value,
        title: this.state.title
      })
    });
    if (id) {
      try {
        const res = await fetch(req);
        const data = await res.json();

        this.setState({
          modalText: "Your document has been saved!",
          lastSaved: Date.now()
        });
      } catch (e) {
        this.setState({
          modalText: "Error Saving Document."
        });
      }
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

    const { modalText, modalShouldShow, value, err, title } = this.state;

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
          <Title
            title={title}
            onChange={event => this.setState({ title: event.target.value })}
          />
          <div className="flex-container">
            <div
              className="half-container preview-container"
              dangerouslySetInnerHTML={output(this.state.value)}
            />
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
              wrapEnabled={true}
              showPrintMargin={false}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default UserEditor;
