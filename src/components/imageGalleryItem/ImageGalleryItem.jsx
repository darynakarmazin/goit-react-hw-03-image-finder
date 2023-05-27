import React, { Component } from 'react';

export class ImageGalleryItem extends Component {
  render() {
    return (
      <li className="gallery-item">
        <img src={this.props.smallImg} alt={this.props.alt} />
      </li>
    );
  }
}
