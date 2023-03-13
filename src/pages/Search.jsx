import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-search">Search</div>
      </>
    );
  }
}

Search.propTypes = {

};

export default Search;
