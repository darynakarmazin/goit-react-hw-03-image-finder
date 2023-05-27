import React, { Component } from 'react';
import {ImageGalleryItemLi} from './ImageGalleryItem.styled'

export class ImageGalleryItem extends Component {
  render() {
    return (
      <ImageGalleryItemLi className="gallery-item">
        <img src={this.props.smallImg} alt={this.props.alt} />
      </ImageGalleryItemLi>
    );
  }
}
