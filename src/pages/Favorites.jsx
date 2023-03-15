import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    // favoriteMusic: false,
    loading: false,
    favoriteSongs: undefined,
  };

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const musicFavorites = await getFavoriteSongs();
      this.setState({
        loading: false,
        favoriteSongs: musicFavorites,
      });
    });
  }

  render() {
    const { loading, favoriteSongs } = this.state;
    return (
      <>
        <Header />
        {loading ? <Loading />
          : (
            <div data-testid="page-favorites">
              <h1>Musicas Favoritas</h1>
              {favoriteSongs
                && favoriteSongs.map((favoriteSong) => (<MusicCard
                  key={ favoriteSong.trackId }
                  trackName={ favoriteSong.trackName }
                  previewUrl={ favoriteSong.previewUrl }
                  trackId={ favoriteSong.trackId }
                />))}
            </div>
          )}
      </>
    );
  }
}

export default Favorites;
