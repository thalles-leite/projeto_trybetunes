import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ListAlbuns extends Component {
  render() {
    const { albuns } = this.props;
    const substringSize = 4;
    if (albuns.length < 1) return <h1>Nenhum álbum foi encontrado</h1>;
    return (
      <div className="albuns">
        {albuns
          .map(
            (album) => (
              <div key={ album.collectionId } className="itemAlbum">
                <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                  <section className="infoAlbum">
                    <h4>{album.artistName}</h4>
                    <p>
                      {`${album.collectionName} 
                      • ${album.trackCount} músicas                       
                      `}
                    </p>
                    <p>{album.releaseDate.substring(0, substringSize)}</p>
                  </section>
                </Link>
              </div>),
          )}
      </div>
    );
  }
}

ListAlbuns.propTypes = {
  albuns: PropTypes.string.isRequired,

};
export default ListAlbuns;
