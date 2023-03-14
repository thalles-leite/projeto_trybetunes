import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ListAlbuns extends Component {
  render() {
    const { albuns } = this.props;
    if (albuns.length < 1) return <h1>Nenhum álbum foi encontrado</h1>;
    return (
      <div className="albuns">
        {albuns.map(({ collectionName, collectionId }) => (
          <div key={ collectionId }>
            <Link
              to={ `/album/${collectionId}` }
              data-testid={ `link-to-album-${collectionId}` }
            >
              {collectionName}
            </Link>
          </div>))}
      </div>
    );
  }
}

ListAlbuns.propTypes = {
  albuns: PropTypes.string.isRequired,

};
export default ListAlbuns;
