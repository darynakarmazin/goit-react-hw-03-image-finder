import React, { Component } from 'react';
import { Overlay, ModalImg } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', event => {
      if (event.code === 'Escape') {
        this.props.closeModal();
      }
    });
  }

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
