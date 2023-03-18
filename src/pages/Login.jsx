import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';

class Login extends Component {
  render() {
    const {
      disabledLogin,
      handleChange,
      value,
      loading,
      insertUser,
      redirectToSearch } = this.props;

    if (redirectToSearch) {
      return <Redirect to="/search" />;
    }

    return (
      loading
        ? (<Loading />)
        : (
          <div data-testid="page-login" className="mainLogin">
            <section className="logo">
              <img src="/logo.png" alt="logo" />
            </section>

            <form>

              <input
                type="text"
                data-testid="login-name-input"
                name="inputName"
                value={ value }
                onChange={ handleChange }
                placeholder="Qual é seu nome?"
                autoComplete="off"
              />

              <button
                type="button"
                data-testid="login-submit-button"
                disabled={ disabledLogin }
                onClick={ insertUser }
              >
                Entrar

              </button>
            </form>
          </div>)
    );
  }
}

Login.propTypes = {
  disabledLogin: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  insertUser: PropTypes.func.isRequired,
  redirectToSearch: PropTypes.bool.isRequired,
};

export default Login;
