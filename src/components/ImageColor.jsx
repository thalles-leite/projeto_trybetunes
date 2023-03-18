import React, { Component } from 'react';
import ColorThief from 'color-thief';

class ImageColor extends Component {
  state = {
    color: '',
    isLoading: true,
  };

  componentDidMount() {
    const img = new Image();
    img.src = this.props.src;
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const colorThief = new ColorThief();
      const color = colorThief.getColor(img);
      this.setState({ color: `rgb(${color.join(', ')})`, isLoading: false });
    };
  }

  render() {
    const { src } = this.props;
    const { color, isLoading } = this.state;

    return (
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div style={ { backgroundColor: color } }>
            <img src={ src } alt="Album cover" />
          </div>
        )}
      </div>
    );
  }
}

export default ImageColor;
