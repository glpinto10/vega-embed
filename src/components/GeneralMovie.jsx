import React, { Component } from 'react';

class GeneralMovie extends Component {
  constructor(props) {
    super(props);

    this.movie = this.props.movie;
  }

  render() {
    return (
      <div className="card w-100 shadow">
        <div className="card-body">
          <p>
            <b>Title:</b> {this.movie.title}
          </p>
          <p>
            <b>Release year:</b> {this.movie.releaseYear}
          </p>
        </div>
      </div>
    );
  }
}

export default GeneralMovie;
