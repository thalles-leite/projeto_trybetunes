import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import ListAlbuns from '../components/ListAlbuns';

class Search extends Component {
  render() {
    const {
      value,
      handleChange,
      searchButton,
      search,
      loadingSearch,
      showResults,
      fetchedArtist } = this.props;
    const inputDisabled = value.length < 2;
    return (
      <>
        <Header />
        <div data-testid="page-search">

          <fieldset>
            <legend>Search</legend>

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
              onClick={ searchButton }
            >
              Pesquisar

            </button>

          </fieldset>

          {showResults
          && (
            <div>
              {`Resultado de álbuns de: ${fetchedArtist}`}
              {
                (loadingSearch) ? <Loading /> : <ListAlbuns albuns={ search } />
              }
            </div>
          )}

        </div>
      </>
    );
  }
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  searchButton: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  loadingSearch: PropTypes.bool.isRequired,
  showResults: PropTypes.bool.isRequired,
  fetchedArtist: PropTypes.string.isRequired,
};

export default Search;
