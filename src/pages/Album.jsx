import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Album extends Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const { callGetMusic } = this.props;
      const { match: { params: { id } } } = this.props;
      await callGetMusic(id);
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const {
      loading,
    } = this.state;
    const {
      funcFavorite,
      musicCards,
      loadingMusic,
      artistAlbum,
      albumName,
      albumImg,
    } = this.props;

    return (
      <>
        <Header />
        {(loadingMusic || loading) ? <Loading />
          : (
            <div data-testid="page-album" className="pageAlbum">
              <Link className="botaoVoltar" to="/search">⬅</Link>
              <section className="albumImageTitle">

                <img className="imgAlbum" src={ albumImg } alt={ albumName } />
                <h3 data-testid="artist-name">{artistAlbum}</h3>
                <p data-testid="album-name">{albumName}</p>
              </section>
              <div className="musics">

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
              </div>
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
  albumImg: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.string.isRequired,
  }).isRequired,
};
export default Album;
