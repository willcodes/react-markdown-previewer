//main logic for UserEditor lives here.

import React from "react";
import Modal from "../Modal/Modal";
import Nav from "../Nav/Nav";
import marked from "marked";
import fileSave from "file-saver";
import config from "../../config";
import Dialog from "material-ui/Dialog";
import axios from "axios";
import { Redirect } from "react-router-dom";

import "./UserEditor.css";

class UserEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      modelText: "",
      modalOpen: false,
      lastSaved: null,
      modalShouldShow: false,
      showCopyButton: true,
    };
  }
  componentDidMount() {
    const { id } = this.props.location.state;
    this.setState({
      lastSaved: null,
      modalShouldShow: id ? true : false
    });
  }

  componentWillMount() {
    const { id } = this.props.location.state;
    console.log(id);
    axios
      .get(`${config.base_url}/api/documents/user/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(res => {
        if (res.status == 200) {
          this.setState({
            value: res.data.content
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

  componentDidUpdate(prevProps, prevState) {
    const { id } = this.props.location.state;
    fetch(this.save())
      .then(res => res)
      .then(() => {
        this.setState({
          lastSaved: Date.now()
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

  save = () => {
    const { id } = this.props.location.state;
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

  saveDocument = () => {
    const { id } = this.props.location.state;
    if (id) {
      fetch(this.save())
        .then(res => res.json())
        .then(() => {
          this.setState({
            modalText: "Your document has been saved!",
            lastSaved: Date.now()
          });
          this.handleModalOpen();
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

    const { modalText, modalShouldShow, value, err } = this.state;

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

export default UserEditor;
