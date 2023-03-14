import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Album extends Component {
  componentDidMount() {
    const { callGetMusic, match: { params: { id } } } = this.props;
    callGetMusic(id);
  }

  render() {
    const { musics, artistAlbum, albumName } = this.props;
    console.log(musics);
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <h1 data-testid="artist-name">{artistAlbum}</h1>
          <h2 data-testid="album-name">{albumName}</h2>
          {
            (musics.length > 0) && (

              musics.slice(1).map(({ previewUrl, trackCount, trackName }) => (
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
                </section>))
            )
          }
        </div>
      </>
    );
  }
}

Album.propTypes = {
  callGetMusic: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.string.isRequired,
  }).isRequired,
  musics: PropTypes.string.isRequired,
  artistAlbum: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
};

export default Album;
