import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    favoriteMusic: false,
  };

  // Ao carregar a página, atualiza o estado favoritMusic de acordo com o isFavorite que é passado por pops.
  async componentDidMount() {
    const { isFavorite } = this.props;
    this.setState({ favoriteMusic: isFavorite });
  }

  render() {
    const { trackName,
      previewUrl,
      trackId,
      funcFavorite,
      music,
      loadingMusic,
    } = this.props;

    const { favoriteMusic } = this.state;
    return (
      loadingMusic ? <Loading />
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
                onChange={ (event) => funcFavorite(event, music) }
                checked={ favoriteMusic }
              />
              Favorita
            </label>
          </div>)
    );
  }
}
MusicCard.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  funcFavorite: PropTypes.func.isRequired,
  music: PropTypes.string.isRequired,
  loadingMusic: PropTypes.bool.isRequired,
};
export default MusicCard;
