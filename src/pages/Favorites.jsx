import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    favorites: '',
  };

  async componentDidMount() {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favorites: favoriteSongs });
    console.log('montou');
  }

  async componentDidUpdate(prevProps) {
    const { favoriteSongs: favoriteSongsProps } = this.props;
    if (favoriteSongsProps !== prevProps.favoriteSongs) {
      const { favoriteSongs } = this.props;
      this.setState({ favorites: favoriteSongs });
    }
  }

  render() {
    const { favorites } = this.state;
    const { funcFavorite, loadingMusic } = this.props;

    return (
      <>
        <Header />

        <div data-testid="page-favorites">
          <h1>Musicas Favoritas</h1>
          {(loadingMusic) ? <Loading /> : favorites && (
            favorites.map(
              (music) => (<MusicCard
                isFavorite
                key={ music.key }
                music={ music }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
                trackName={ music.trackName }
                funcFavorite={ funcFavorite }
                loadingMusic={ loadingMusic }
              />),
            )
          )}
        </div>

      </>
    );
  }
}

Favorites.propTypes = {
  favoriteSongs: PropTypes.shape({

  }).isRequired,
  funcFavorite: PropTypes.func.isRequired,
  loadingMusic: PropTypes.bool.isRequired,
};

export default Favorites;
