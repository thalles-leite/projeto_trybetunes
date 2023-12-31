import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    // dataUser: '',
    loading: false,
    inputName: '',
    inputDescription: '',
    inputEmail: '',
    inputImage: '',
    redirect: false,
  };

  async componentDidMount() {
    this.setState({ loading: true }, async () => {
      const dataUser = await getUser();
      this.setState(
        { loading: false,
          inputName: dataUser.name,
          inputDescription: dataUser.description,
          inputEmail: dataUser.email,
          inputImage: dataUser.image,
        },
      );
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  dataUpdate = async () => {
    this.setState({ loading: true }, async () => {
      const { inputName,
        inputDescription,
        inputEmail,
        inputImage } = this.state;
      const newUser = {
        name: inputName,
        email: inputEmail,
        image: inputImage,
        description: inputDescription,
      };
      await updateUser(newUser);
      this.setState({
        redirect: true,
        loading: false,
      });
    });
  };

  render() {
    const {
      loading,
      inputName,
      inputDescription,
      inputEmail,
      inputImage,
      redirect,
    } = this.state;

    const enableButton = (
      inputName.length > 0
      && inputDescription.length > 0
      && inputEmail.length > 0
      && inputImage.length > 0);
    if (redirect) return (<Redirect to="/profile" />);
    const image = inputImage || '/defaultProfile.png';
    return (
      <div>
        <Header />
        <div data-testid="page-profile-edit" className="pageProfileEdit">
          <h1> Editar perfil </h1>
          { loading ? <Loading />
            : (
              <form>
                <section className="profileImage">
                  <img
                    data-testid="profile-image"
                    src={ image }
                    alt={ inputName }
                  />

                </section>
                <label>
                  <span>Nome:</span>
                  <input
                    type="text"
                    name="inputName"
                    value={ inputName }
                    data-testid="edit-input-name"
                    onChange={ this.handleChange }
                  />
                </label>
                <label>
                  <span>Descrição:</span>
                  <input
                    type="text"
                    name="inputDescription"
                    value={ inputDescription }
                    data-testid="edit-input-description"
                    onChange={ this.handleChange }
                  />
                </label>
                <label>
                  <span>Email:</span>
                  <input
                    type="text"
                    name="inputEmail"
                    value={ inputEmail }
                    data-testid="edit-input-email"
                    onChange={ this.handleChange }
                  />
                </label>
                <label>
                  <span>Imagem:</span>
                  <input
                    type="text"
                    name="inputImage"
                    value={ inputImage }
                    data-testid="edit-input-image"
                    onChange={ this.handleChange }
                  />
                </label>
                <button
                  type="button"
                  data-testid="edit-button-save"
                  disabled={ !enableButton }
                  onClick={ this.dataUpdate }
                >
                  Salvar

                </button>
              </form>)}

        </div>

      </div>
    );
  }
}

export default Profile;
