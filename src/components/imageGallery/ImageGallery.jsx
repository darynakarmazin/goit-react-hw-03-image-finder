import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { ImageGalleryItem } from 'components/imageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/loader/Loader';
import { Button } from 'components/button/Button';
import { ImageGalleryUl } from './ImageGallery.styled';
import { fetchGalleryImg } from '../../Api/fetchGalleryImg';

export class ImageGallery extends Component {
  state = {
    images: null,
    loading: false,
    page: 1,
  };

  onFindMore = () => {
    this.setState({ page: this.state.page + 1 });
    this.setState({ loading: true });

    fetchGalleryImg(this.props.searchQuery, this.state.page)
      .then(({ hits }) => {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ loading: true, images: null, page: 1 });

      fetchGalleryImg(this.props.searchQuery, this.state.page)
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
      <div
        style={{
          margin: '0 auto',
        }}
      >
        {this.state.loading && <Loader />}

        {this.state.images && (
          <ImageGalleryUl className="gallery">
            {this.state.images.map(image => {
              return (
                <ImageGalleryItem
                  key={image.id}
                  smallImg={image.webformatURL}
                  alt={image.tags}
                />
              );
            })}
          </ImageGalleryUl>
        )}
        {this.state.images && <Button onFindMore={() => this.onFindMore()} />}
      </div>
    );
  }
}
