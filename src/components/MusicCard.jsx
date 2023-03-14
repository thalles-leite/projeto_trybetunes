import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    favoriteMusic: false,
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true }, async () => {
      const favoriteMusic = await this.verifyFavorite();
      this.setState({
        favoriteMusic,
        loading: false,
      });
    });
  }

  verifyFavorite = async () => {
    const { music } = this.props;
    const musicFavorites = await getFavoriteSongs();
    return musicFavorites.some(({ trackId }) => music.trackId === trackId);
  };

  render() {
    const { trackName,
      previewUrl,
      trackId,
      funcFavorite,
      music,
    } = this.props;

    const { favoriteMusic, loading } = this.state;
    return (
      loading ? <Loading />
        : (
          <div>
            <p>{trackName}</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <label>
              <input
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                onClick={ (event) => funcFavorite(event, music) }
                checked={ favoriteMusic }
              />
              Favorita
            </label>
          </div>)
    );
  }
}
MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  funcFavorite: PropTypes.func.isRequired,
  music: PropTypes.shape({
    trackId: PropTypes.string.isRequired,
  }).isRequired,
};
export default MusicCard;
