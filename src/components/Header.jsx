import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faStar, faUserCircle }
  from '@fortawesome/free-solid-svg-icons';
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
    const { nameUser, loading, loadingMusic } = this.state;
    if (loading || loadingMusic) return <Loading />;
    return (
      <section className="containerHeader">
        <section
          data-testid="header-user-name"
          className="header-user-name"
        >
          <span>Bem vindo(a): &nbsp;</span>
          {nameUser}
        </section>
        <div data-testid="header-component" className="headerCommponent">
          <Link to="/">
            <img className="logoHeader" src="/logo.png" alt="logo" />

          </Link>
          <nav>
            <Link to="/search" data-testid="link-to-search">
              <FontAwesomeIcon icon={ faMagnifyingGlass } />

            </Link>
            <Link to="/favorites" data-testid="link-to-favorites">
              <FontAwesomeIcon icon={ faStar } />
            </Link>
            <Link to="/profile" data-testid="link-to-profile">
              <FontAwesomeIcon icon={ faUserCircle } />
            </Link>
          </nav>

        </div>

      </section>
    );
  }
}

export default Header;
