import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { faMagnifyingGlass }
  from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
        <div data-testid="page-search" className="pageSearch">
          <h1>

            Buscar
          </h1>
          <form>
            <label>
              {/* Digite o nome do artista: */}
              <input
                type="text"
                data-testid="search-artist-input"
                value={ value }
                onChange={ handleChange }
                name="inputSearch"
                placeholder="Digite o nome do artista:"
              />
            </label>
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ inputDisabled }
              onClick={ searchButton }
            >
              {/* Pesquisar */}
              <FontAwesomeIcon icon={ faMagnifyingGlass } />

            </button>
          </form>

          {showResults
          && (

            (loadingSearch) ? <Loading /> : (
              <div className="listAlbuns">
                <h4 className="searchTitle">
                  {`Resultado de álbuns de: ${fetchedArtist}`}
                </h4>
                <ListAlbuns albuns={ search } />
              </div>)

          )}

        </div>
      </>
    );
  }
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  searchButton: PropTypes.func.isRequired,
  search: PropTypes.arrayOf.isRequired,
  loadingSearch: PropTypes.bool.isRequired,
  showResults: PropTypes.bool.isRequired,
  fetchedArtist: PropTypes.string.isRequired,
};

export default Search;
