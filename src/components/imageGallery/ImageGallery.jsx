import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { ImageGalleryItem } from 'components/imageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/loader/Loader';
const API_KEY = '35290900-56ffde2696ef97590bed2c34b';
const URL = `https://pixabay.com/api/`;

export class ImageGallery extends Component {
  state = {
    images: null,
    loading: false,
    page: 1,
    perPage: 12,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ loading: true, images: null });
      fetch(
        `${URL}?q=${this.props.searchQuery}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${this.perPage}`
      )
        .then(response => response.json())
        .then(({ hits }) => {
          if (hits.length === 0) {
            toast.error(
              'Sorry, there are no images matching your search query. Please try again.'
            );
          } else this.setState({ images: hits });
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    return (
      <>
        {this.state.loading && <Loader />}
        {this.state.images && (
          <ul className="gallery">
            {this.state.images.map(image => {
              return (
                <ImageGalleryItem
                  key={image.id}
                  smallImg={image.webformatURL}
                  alt={image.tags}
                />
              );
            })}
          </ul>
        )}
      </>
    );
  }
}
