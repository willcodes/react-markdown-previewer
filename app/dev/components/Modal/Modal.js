import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import Dialog from "material-ui/Dialog";

import "./Modal.css"

export default class Modal extends React.Component {
  actions = [
    <FlatButton
      label="Close"
      onClick={this.props.close}
      primary={true}
      className="cancel-btn"
    />
  ];

  render() {
    return (
      <Dialog
        className="modal-container"
        title={this.props.title}
        actions={this.actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.close}
      >
        <pre>{window.location.href}</pre>
        <CopyToClipboard text={window.location.href}>
          <RaisedButton
            className="copy-link-btn"
            label="Copy link"
            labelColor="#eee"
            backgroundColor="#364459"
          />
        </CopyToClipboard>
      </Dialog>
    );
  }
}
