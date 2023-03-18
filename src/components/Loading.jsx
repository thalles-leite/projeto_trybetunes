import React, { Component } from 'react';

class Loading extends Component {
  render() {
    return (
      <div className="loadingContainer">
        <section className="imgLoading">
          {/* <img src="logo.png" alt="..." /> */}
        </section>
        <p>Carregando...</p>
      </div>
    );
  }
}

export default Loading;
