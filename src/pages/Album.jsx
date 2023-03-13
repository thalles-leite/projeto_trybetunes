import React, { Component } from 'react';
import Header from '../components/Header';
// import PropTypes from 'prop-types';

class Album extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-album" />
      </>
    );
  }
}

Album.propTypes = {

};

export default Album;
