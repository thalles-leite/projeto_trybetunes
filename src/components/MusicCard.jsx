import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

class MusicCard extends Component {
  render() {
    const { musics, saveFavorite, loading, favoritesList } = this.props;
    return (

      loading ? <Loading />
        : (
          <div>
            { musics.slice(1)
              .map((
                {
                  previewUrl,
                  trackId,
                  trackName },
                index,
              ) => (
                <section key={ trackId }>
                  <p>{trackName}</p>
                  <audio
                    data-testid="audio-component"
                    src={ previewUrl }
                    controls
                  >
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    <code>audio</code>
                  </audio>
                  <label>
                    Favorita
                    <input
                      type="checkbox"
                      name="trackId"
                      data-testid={ `checkbox-music-${trackId}` }
                      // o +1 é pq eu tirei o primeiro elemento
                      onChange={ () => saveFavorite(musics[index + 1]) }
                      checked={ favoritesList.some((id) => id === trackId) }
                    />
                  </label>
                </section>))}
          </div>)

    );
  }
}
MusicCard.propTypes = {
  musics: PropTypes.string.isRequired,
  saveFavorite: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  favoritesList: PropTypes.string.isRequired,
};

export default MusicCard;
