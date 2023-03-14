import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { musics } = this.props;
    console.log(musics);
    return (
      <div>
        { musics.slice(1).map(({ previewUrl, trackCount, trackName }) => (
          <section key={ trackCount }>
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
          </section>))}
      </div>
    );
  }
}
MusicCard.propTypes = {
  musics: PropTypes.string.isRequired,
};

export default MusicCard;
