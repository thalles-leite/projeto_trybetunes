import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    nameUser: '',
    loading: false,
  };

  componentDidMount() {
    this.getUserFunc();
  }

  getUserFunc = async () => {
    this.setState({ loading: true });
    const { name } = await getUser();
    this.setState({
      nameUser: name,
      loading: false,
    });
  };

  render() {
    const { nameUser, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="header-component">
        <nav>
          <Link to="/search" data-testid="link-to-search">Buscar</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
        <h1 data-testid="header-user-name">{nameUser}</h1>
      </div>
    );
  }
}

export default Header;
