import React from 'react';

class Modal extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div id="popupModal">
                <p>{this.props.modalText}</p>
            </div>
        )
    }
}

export default Modal;