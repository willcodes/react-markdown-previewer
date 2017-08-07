import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="popupModal" className={this.props.modalClass}>
        <p>
          {this.props.modalText}
        </p>
        <CopyToClipboard text={window.location.href}>
          <button className="copyButton">Click to copy link</button>
        </CopyToClipboard>
      </div>
    );
  }
}

export default Modal;
