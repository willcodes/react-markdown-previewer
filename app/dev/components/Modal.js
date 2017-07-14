import React from 'react';

class Modal extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div 
                id="popupModal"
                className={this.props.modalClass}>
                <p>{this.props.modalText}</p>
            </div>
        )
    }
}

export default Modal;