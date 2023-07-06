import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { faL } from '@fortawesome/free-solid-svg-icons';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    favoriteMusic: false,
    isPlaying: false,
  };

  audioRef = React.createRef();

  // Ao carregar a página, atualiza o estado favoritMusic de acordo com o isFavorite que é passado por pops.
  async componentDidMount() {
    const { isFavorite } = this.props;
    this.setState({ favoriteMusic: isFavorite });
  }

  handlePlayClick = () => {
    const { isPlaying } = this.state;
    const audio = this.audioRef.current;
    if (isPlaying) {
      this.setState({ isPlaying: false });
    }

    audio.addEventListener('ended', () => {
      this.setState({ isPlaying: false });
    });

    audio.play();
    this.setState({ isPlaying: true });
  };

  handlePauseClick = () => {
    const audio = this.audioRef.current;
    audio.pause();
    this.setState({ isPlaying: false });
  };

  render() {
    const { trackName,
      previewUrl,
      trackId,
      funcFavorite,
      music,
      loadingMusic,
      artistName,
    } = this.props;

    const { favoriteMusic, isPlaying } = this.state;
    return (
      loadingMusic ? <Loading />
        : (
          <div className="musicCard">

            <audio
              ref={ this.audioRef }
              data-testid="audio-component"
              src={ previewUrl }
            >
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>

            <div className="audioPlayer">
              {isPlaying ? (
                <button onClick={ this.handlePauseClick }>⏸</button>
              ) : (
                <button onClick={ this.handlePlayClick }>▶</button>
              )}
            </div>

            <p
              className={ isPlaying && 'plaing' }
            >
              {artistName && <span>{`${artistName} • `}</span>}
              {trackName}

            </p>
            <section className="eqImage">

              {isPlaying && <img src="/equalizer.gif" alt="..." />}
            </section>

            <label
              className="labelCheckBox"

            >
              <span className="favoriteName">Favorita</span>
              <span className="heart" />
              <input
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ (event) => funcFavorite(event, music) }
                checked={ favoriteMusic }
                className="checkBoxFavorite"
              />
            </label>

          </div>)
    );
  }
}
export default MusicCard;
