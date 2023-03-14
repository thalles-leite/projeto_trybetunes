import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import { addSong } from './services/favoriteSongsAPI';
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
    redirectToSearch: false,
    fetchedArtist: '',
    search: [],
    showResults: false,
    // idAlbum: '',
    musics: '',
    artistAlbum: '',
    albumName: '',
    favoritesList: [],
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
      favoritesList,
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

          />) }
        />
        <Route exact path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
        <Route exact path="*" component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
