import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    dataUser: '',
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true }, async () => {
      const dataUser = await getUser();
      this.setState({ dataUser, loading: false });
    });
  }

  render() {
    const { dataUser, loading } = this.state;

    return (
      <>
        <Header />
        <div data-testid="page-profile">
          { loading ? <Loading />
            : (
              <>
                <p>{dataUser.name}</p>
                <p>{dataUser.description}</p>
                <p>{dataUser.email}</p>
                <img
                  data-testid="profile-image"
                  src={ dataUser.image }
                  alt={ dataUser.name }
                />
                <Link to="/profile/edit">Editar perfil</Link>
              </>
            )}
        </div>
      </>
    );
  }
}

export default Profile;
