import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loading from './components/Loading';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import { addSong, getFavoriteSongs, removeSong } from './services/favoriteSongsAPI';
import getMusics from './services/musicsAPI';
import searchAlbumsAPI from './services/searchAlbumsAPI';
import { createUser } from './services/userAPI';

class App extends React.Component {
  state = {
    disabledLogin: true,
    inputName: '',
    inputSearch: '',
    loading: false,
    loadingSearch: false,
    loadingMusic: false,
    redirectToSearch: false,
    fetchedArtist: '',
    search: [],
    showResults: false,
    musics: '',
    artistAlbum: '',
    albumName: '',
    albumImg: '',
    musicCards: [],
  };

  componentDidMount() {

  }

  callGetMusic = async (id) => {
    const music = await getMusics(id);
    const artist = music[0].artistName;
    const album = music[0].collectionName;
    const { artworkUrl100 } = music[0];

    this.setState({
      musics: music,
      artistAlbum: artist,
      albumName: album,
      albumImg: artworkUrl100,
    }, async () => { this.loadMusicCards(); });
  };

  funcFavorite = (event, music) => {
    const { checked } = event.target;
    const { musicCards } = this.state;

    const updatedMusicCards = [...musicCards]; // Cria uma copia de musicCards
    const musicFound = musicCards
      .findIndex(({ music: musicValue }) => (musicValue === music)); // Econtro o indice correspondente da musica clicada no musicCards
    this.setState({ loadingMusic: true }, async () => {
      if (checked) {
        await addSong(music);
        updatedMusicCards[musicFound].isFavorite = true; // Altero esse indice na copia do musicCards
      } else {
        await removeSong(music);
        updatedMusicCards[musicFound].isFavorite = false; // ...
      }
      const favoriteSongs = await getFavoriteSongs();
      this.setState({
        loadingMusic: false,
        musicCards: updatedMusicCards,
        favoriteSongs, // Atualizo o musicCard com o array
      });
    });
  };

  funcFavorite2 = (event, music) => {
    const { checked } = event.target;
    this.setState({ loadingMusic: true }, async () => {
      if (checked) {
        await addSong(music);
      } else {
        await removeSong(music);
      }
      const favoriteSongs = await getFavoriteSongs();
      this.setState({
        loadingMusic: false,
        favoriteSongs,
      });
    });
  };

  loadMusicCards = async () => {
    const { musics } = this.state;

    if (musics) {
      const musicCards = await Promise.all(musics.slice(1).map(async (music) => {
        const musicsFavorites = await getFavoriteSongs();

        const isFavorite = musicsFavorites
          .some(({ trackId }) => music.trackId === trackId);

        return ({
          key: music.trackId,
          trackName: music.trackName,
          previewUrl: music.previewUrl,
          trackId: music.trackId,
          music,
          isFavorite,
        });
      }));
      const favoriteSongs = await getFavoriteSongs();
      this.setState({
        favoriteSongs,
        musicCards,
      });
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.verifyInput);
  };

  verifyInput = () => {
    const { inputName } = this.state;
    const lengthMin = 3;
    this.setState({ disabledLogin: inputName.length < lengthMin });
  };

  insertUser = () => {
    this.setState({
      loading: true,
    }, async () => {
      const { inputName: value } = this.state;
      const user = { name: value };
      await createUser(user);
      this.setState({ loading: false, redirectToSearch: true });
    });
  };

  searchButton = (event) => {
    event.preventDefault();
    const { inputSearch: artista } = this.state;
    this.setState({
      loadingSearch: true,
      inputSearch: '',
      showResults: true,
      fetchedArtist: artista,
    }, async () => {
      const response = await searchAlbumsAPI(artista);
      this.setState({
        search: response,
        loadingSearch: false,
      });
    });
  };

  render() {
    const {
      disabledLogin,
      inputName,
      loading,
      loadingSearch,
      redirectToSearch,
      inputSearch,
      search,
      showResults,
      fetchedArtist,
      musics,
      artistAlbum,
      albumName,
      musicCards,
      loadingMusic,
      favoriteSongs,
      albumImg,
    } = this.state;

    return (
      <Switch>
        <Route
          exact
          path="/"
          render={ () => (<Login
            handleChange={ this.handleChange }
            disabledLogin={ disabledLogin }
            value={ inputName }
            loading={ loading }
            insertUser={ this.insertUser }
            redirectToSearch={ redirectToSearch }
          />) }

        />
        <Route
          exact
          path="/search"
          render={ () => (<Search
            handleChange={ this.handleChange }
            value={ inputSearch }
            searchButton={ this.searchButton }
            search={ search }
            loading={ loading }
            loadingSearch={ loadingSearch }
            showResults={ showResults }
            fetchedArtist={ fetchedArtist }
          />) }
        />

        <Route
          exact
          path="/album/:id"
          render={ (props) => (<Album
            { ...props }
            musics={ musics }
            artistAlbum={ artistAlbum }
            albumName={ albumName }
            funcFavorite={ this.funcFavorite }
            loadMusicCards={ this.loadMusicCards }
            callGetMusic={ this.callGetMusic }
            musicCards={ musicCards }
            loadingMusic={ loadingMusic }
            albumImg={ albumImg }
          />) }
        />
        <Route
          exact
          path="/favorites"
          render={ () => (<Favorites
            musicCards={ musicCards }
            funcFavorite={ this.funcFavorite2 }
            loadMusicCards={ this.loadMusicCards }
            callGetMusic={ this.callGetMusic }
            loadingMusic={ loadingMusic }
            favoriteSongs={ favoriteSongs }
          />) }

        />

        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
        <Route exact path="/carregando" component={ Loading } />
        <Route exact path="*" component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
