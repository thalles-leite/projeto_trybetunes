import React, { Component } from 'react';
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
        <h1 data-testid="header-user-name">{nameUser}</h1>
      </div>
    );
  }
}

export default Header;
