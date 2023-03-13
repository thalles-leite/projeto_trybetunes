import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import { createUser } from './services/userAPI';

class App extends React.Component {
  state = {
    disabledLogin: true,
    inputName: '',
    inputSearch: '',
    loading: false,
    redirectToSearch: false,
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

  render() {
    const {
      disabledLogin,
      inputName,
      loading,
      redirectToSearch,
      inputSearch } = this.state;

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
          />) }
        />

        <Route exact path="/album/:id" render={ () => <Album /> } />
        <Route exact path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
        <Route exact path="*" component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
