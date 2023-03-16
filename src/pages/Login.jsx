import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class Login extends Component {
  render() {
    const {
      disabledLogin,
      handleChange,
      value,
      loading,
      insertUser,
      redirectToSearch } = this.props;
    const loadingElement = <span>Carregando...</span>;
    console.log(`Loading.${loading}`);

    if (redirectToSearch) {
      return <Redirect to="/search" />;
    }

    return (
      loading
        ? (loadingElement)
        : (
          <div data-testid="page-login" className="page-login">
            <fieldset>
              <legend>Login</legend>
              <form>
                <input
                  type="text"
                  data-testid="login-name-input"
                  name="inputName"
                  value={ value }
                  onChange={ handleChange }
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
            </fieldset>
          </div>)
    );
  }
}

Login.propTypes = {
  disabledLogin: PropTypes.string.isRequired,
  handleChange: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  loading: PropTypes.string.isRequired,
  insertUser: PropTypes.string.isRequired,
  redirectToSearch: PropTypes.string.isRequired,
};

export default Login;
