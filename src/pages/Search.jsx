import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Search extends Component {
  render() {
    const { value, handleChange } = this.props;
    const inputDisabled = value.length < 2;
    return (

      <>
        <Header />
        <div data-testid="page-search">Search</div>
        <input
          type="text"
          data-testid="search-artist-input"
          value={ value }
          onChange={ handleChange }
          name="inputSearch"
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ inputDisabled }
        >
          Pesquisar

        </button>
      </>
    );
  }
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Search;
