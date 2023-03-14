import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  state = {
    artistAlbum: '',
    albumName: '',
    loading: false,
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.callGetMusic(id);
  }

  callGetMusic = async (id) => {
    const music = await getMusics(id);
    const artist = music[0].artistName;
    const album = music[0].collectionName;
    this.setState({
      musics: music,
      artistAlbum: artist,
      albumName: album,
    });
  };

  funcFavorite = (event, music) => {
    const { checked } = event.target;
    this.setState({
      loading: true,
    }, async () => {
      if (checked) {
        await addSong(music);
      } else {
        await removeSong(music);
      }
      this.setState({
        loading: false,
      });
    });
  };

  render() {
    const {
      artistAlbum,
      albumName,
      musics,
      loading } = this.state;
    return (
      <>
        <Header />
        {loading ? <Loading />
          : (
            <div data-testid="page-album">
              <h1 data-testid="artist-name">{artistAlbum}</h1>
              <h2 data-testid="album-name">{albumName}</h2>
              {musics
          && (
            musics
              .slice(1)
              .map((music) => (<MusicCard
                key={ music.trackId }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
                funcFavorite={ this.funcFavorite }
                music={ music }
              />)))}
            </div>)}
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.string.isRequired,
  }).isRequired,
};

export default Album;
