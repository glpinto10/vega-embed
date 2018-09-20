import React, { Component } from 'react';
import Movies from './Movies';
import MovieSelector from './MovieSelector';

class Home extends Component {
  render() {
    return (
      <div>
        <MovieSelector />
        <hr />
        <Movies />
      </div>
    );
  }
}

export default Home;
