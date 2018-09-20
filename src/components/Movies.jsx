import React, { Component } from 'react';
import axios from 'axios';
import GeneralMovie from './GeneralMovie';

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      message: '',
      movies: [],
      page: 1
    };

    this.handleChangePage = this.handleChangePage.bind(this);
    this.api = 'mernMovies/movies/';
  }

  handleChangePage(event) {
    this.setState(
      { movies: [], page: event.target.value },
      this.getAllMovies(event.target.value)
    );
  }

  getAllMovies(page) {
    axios.get(this.api + (page - 1)).then(res => {
      const success = res.data.success;
      if (success) {
        this.setState({
          success: success,
          movies: res.data.movies
        });
      } else {
        this.setState({
          success: success,
          message: res.data.message,
          movies: []
        });
      }
    });
  }

  componentDidMount() {
    this.getAllMovies(1);
  }

  showMovies() {
    let moviesToShow = [];
    if (this.state.success) {
      this.state.movies.forEach(movie => {
        moviesToShow.push(
          <div
            className="col-md-4 col-12 d-flex align-items-stretch mb-3"
            key={movie.title}
          >
            <GeneralMovie movie={movie} />
          </div>
        );
      });
    }

    return moviesToShow;
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Movie list</h2>
        <label htmlFor="pageRange" className="text-center">
          Page <b>{this.state.page}</b> of 34
        </label>
        <input
          type="range"
          className="custom-range mb-4"
          min="1"
          max="34"
          step="1"
          id="pageRange"
          value={this.state.page}
          onChange={this.handleChangePage}
        />
        <div className="row">{this.showMovies()}</div>
      </div>
    );
  }
}

export default Movies;
