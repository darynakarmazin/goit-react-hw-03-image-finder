import React, { Component } from 'react';
import { Overlay, ModalImg } from './Modal.styled';

export class Modal extends Component {
  render() {
    return (
      <Overlay onClick={this.props.closeModal}>
        <ModalImg>
          <img src={this.props.modalImage} alt="modalImage" />
        </ModalImg>
      </Overlay>
    );
  }
}
