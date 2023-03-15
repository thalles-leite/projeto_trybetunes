import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Album extends Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const { callGetMusic } = this.props;
      const { match: { params: { id } } } = this.props;
      await callGetMusic(id);
      this.setState({ loading: false });
    });
  }

  render() {
    const {
      loading,
    } = this.state;
    const { funcFavorite, musicCards, loadingMusic, artistAlbum, albumName } = this.props;
    return (
      <>
        <Header />
        {(loadingMusic || loading) ? <Loading />
          : (
            <div data-testid="page-album">
              <h1 data-testid="artist-name">{artistAlbum}</h1>
              <h2 data-testid="album-name">{albumName}</h2>
              {musicCards && (
                musicCards.map(
                  (
                    { isFavorite, key, music, previewUrl, trackId, trackName },
                  ) => (<MusicCard
                    isFavorite={ isFavorite }
                    key={ key }
                    music={ music }
                    previewUrl={ previewUrl }
                    trackId={ trackId }
                    trackName={ trackName }
                    funcFavorite={ funcFavorite }
                    loadingMusic={ loadingMusic }
                  />),
                )
              )}
            </div>)}
      </>
    );
  }
}

Album.propTypes = {
  callGetMusic: PropTypes.func.isRequired,
  funcFavorite: PropTypes.string.isRequired,
  musicCards: PropTypes.string.isRequired,
  loadingMusic: PropTypes.bool.isRequired,
  artistAlbum: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.string.isRequired,
  }).isRequired,
};
export default Album;
