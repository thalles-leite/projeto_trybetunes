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

    const image = dataUser.image || '/defaultProfile.png';
    console.log(image);
    return (
      <>
        <Header />
        <div data-testid="page-profile" className="pageProfile">
          { loading ? <Loading />
            : (
              <>
                <img
                  data-testid="profile-image"
                  src={ image }
                  alt={ dataUser.name }
                />
                <section className="dataProfile">
                  <section>
                    <span className="labPerf">Nome: </span>
                    <span>{dataUser.name}</span>
                  </section>

                  <section>
                    <span className="labPerf">Email: </span>
                    <span>{dataUser.email}</span>
                  </section>

                  <section>
                    <span className="labPerf">Descrição: </span>
                    <span>{dataUser.description}</span>

                  </section>
                  <button type="button" className="btnEditProfile">
                    <Link to="/profile/edit"> 👤  Editar perfil</Link>
                  </button>
                </section>
              </>
            )}
        </div>
      </>
    );
  }
}

export default Profile;
