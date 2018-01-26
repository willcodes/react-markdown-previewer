import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";

const Modal = ({ modalText, modalClass }) => {
  return (
    <div id="popupModal" className={modalClass}>
      <p>{modalText}</p>
      <CopyToClipboard text={window.location.href}>
        <button className="copyButton">Click to copy link</button>
      </CopyToClipboard>
    </div>
  );
};

export default Modal;
