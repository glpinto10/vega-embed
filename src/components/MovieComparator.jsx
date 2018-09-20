import React, { Component } from 'react';
import GeneralComparedMovie from './GeneralComparedMovie';

class MovieComparator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: false,
      movies: this.props.moviesToCompare
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.moviesToCompare !== this.state.movies) {
      this.setState({
        movies: nextProps.moviesToCompare
      });
    }
  }

  showComparedMovies() {
    let comparedMovies = [];

    for (let index = 0; index < this.state.movies.length; index++) {
      const movie = this.state.movies[index];
      comparedMovies.push(
        <div
          className="col-6  d-flex align-items-stretch"
          key={movie.title + movie.rating}
        >
          <GeneralComparedMovie movie={movie} pos={index} />
        </div>
      );
    }

    return comparedMovies;
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <h4>The result of the comparation:</h4>
          <br />
        </div>
        {this.showComparedMovies()}
      </div>
    );
  }
}

export default MovieComparator;
