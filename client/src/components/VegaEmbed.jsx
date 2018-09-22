import React, { Component } from 'react';
import Input from './Input';
import axios from 'axios';

class VegaEmbed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      option: 0,
      ratingUser: JSON.parse(localStorage.getItem('ratingVegaEmbedGP')),
      userRating: 5,
      userName: '',
      veRating: 'There are no'
    };

    this.api = '/vegaEmbed/api/';

    this.handleSubmitRating = this.handleSubmitRating.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleChangeRating = this.handleChangeRating.bind(this);

    this.getAverageRating();
  }

  changeOption(value) {
    this.setState({
      option: value
    });
  }

  handleChangeRating(event) {
    this.setState({
      userRating: event.target.value
    });
  }

  handleChangeUserName(event) {
    this.setState({
      userName: event.target.value
    });
  }

  getAverageRating() {
    axios.get(this.api + 'ratings').then(res => {
      const success = res.data.success;
      if (success) {
        let ratings = res.data.ratings;
        this.setState({
          veRating: 'We have ' + this.getAverage(ratings) + ' out of 5'
        });
      }
    });
  }

  getAverage(ratings) {
    let average = 0;
    ratings.forEach(rating => {
      average += rating.rating;
    });
    return average / ratings.length;
  }

  handleSubmitRating(event) {
    let rating = this.state.userRating;
    let user = this.state.userName;
    axios
      .post(this.api + 'ratings', {
        username: user,
        rating: rating
      })
      .then(res => {
        let success = res.data.success;
        if (success) {
          let ratingUser = {
            username: user,
            rating: rating
          };
          localStorage.setItem('ratingVegaEmbedGP', JSON.stringify(ratingUser));
          this.setState(
            {
              ratingUser: ratingUser
            },
            window.location.reload()
          );
        }
      })
      .catch(function(error) {
        console.log(error);
      });

    event.preventDefault();
  }

  showRatingOptions() {
    if (this.state.ratingUser) {
      return (
        <div className="col-12 text-center">
          <h4>
            Thanks for rating us with {this.state.ratingUser.rating} stars{' '}
            {this.state.ratingUser.username}
            &nbsp;
            <i className="far fa-smile-beam" />
          </h4>
        </div>
      );
    } else {
      return (
        <div className="col-12">
          <h3 className="text-center">
            Please rate us <i className="far fa-grin-beam" />
          </h3>
          <p className="text-center small-font">
            (The window will reload on submit)
          </p>
          <form onSubmit={this.handleSubmitRating}>
            <div className="form-row">
              <div className="col-md-4" />
              <div className="col-md-3 col-12">
                <div className="form-group">
                  <label htmlFor="userNameInput">
                    <b>Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="userNameInput"
                    onChange={this.handleChangeUserName}
                    required
                  />
                </div>
              </div>
              <div className="col-md-1 col-12">
                <label htmlFor="ratingInput">
                  <b>Rating</b>
                  &nbsp;
                  <i className="fas fa-star text-warning" />
                </label>
                <select
                  id="ratingInput"
                  className="custom-select"
                  onChange={this.handleChangeRating}
                  required
                >
                  <option value="5">5</option>
                  <option value="4">4</option>
                  <option value="3">3</option>
                  <option value="2">2</option>
                  <option value="1">1</option>
                </select>
              </div>
              <div className="col-md-4 col-12" />
              <div className="col-md-4 col-12" />
              <div className="col-md-8 col-12">
                <button type="submit" className="btn btn-success">
                  <i className="far fa-star" />
                  &nbsp;Rate
                </button>
                <br />
              </div>
            </div>
          </form>
        </div>
      );
    }
  }

  showSelectedOption(option) {
    let selected = [];
    const backButton = (
      <div className="col-12 mt-3" key="selectionInputButton">
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={() => this.changeOption(0)}
        >
          <i className="fas fa-arrow-left" />
          &nbsp;Home
        </button>
      </div>
    );
    if (option === 0) {
      selected.push(
        <div className="col-12 text-center" key="createGraph">
          <h3 className="mb-3">Click the button whenever you want to start</h3>
          <button
            type="button"
            className="btn btn-primary mr-2 mb-2"
            onClick={() => this.changeOption(1)}
          >
            <i className="far fa-edit" />
            &nbsp;Create my graph
          </button>
        </div>
      );
    } else if (option === 1) {
      selected.push(backButton);
      selected.push(<Input key="inputForm" />);
    }
    return selected;
  }

  render() {
    return (
      <div className="row">
        {this.showSelectedOption(this.state.option)}
        <div className="col-12">
          <hr />
        </div>
        {this.showRatingOptions()}
        <div className="col-12">
          <hr />
          <h3 className="text-center">
            {this.state.veRating}
            &nbsp;
            <i className="fas fa-star text-warning" />
          </h3>
        </div>
      </div>
    );
  }
}

export default VegaEmbed;
