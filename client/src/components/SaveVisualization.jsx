import React, { Component } from 'react';
import axios from 'axios';

class SaveVisualization extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spec: props.spec,
      username: '',
      visualizationTitle: '',
      message: '',
      saved: false
    };

    this.api = '/vegaEmbed/api/';

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
  }

  handleSubmit(event) {
    let spec = this.state.spec;
    let data = [];
    if (spec.data.values > 1000) {
      data = spec.data.values.slice(0, 1000);
    } else {
      data = spec.data.values.slice();
    }
    spec.data.values = data;
    let title = this.state.visualizationTitle;
    let user = this.state.username;
    let date = new Date().getTime();

    axios
      .post(this.api + 'visualizations', {
        username: user,
        spec: spec,
        title: title,
        date: date
      })
      .then(res => {
        let success = res.data.success;
        if (success) {
          this.setState(
            {
              message: res.data.message,
              saved: true
            },
            () => {
              alert(res.data.message);
              window.location.reload();
            }
          );
        } else {
          this.setState({
            message: res.data.message,
            saved: false
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });

    event.preventDefault();
  }

  handleChangeUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  handleChangeTitle(event) {
    this.setState({
      visualizationTitle: event.target.value
    });
  }

  showForm() {
    if (!this.state.saved) {
      return (
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="usernameInput">
              <b>Your name</b>
            </label>
            <input
              type="text"
              className="form-control"
              id="usernameInput"
              onChange={this.handleChangeUsername}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="titleInput">
              <b>Visualization title</b>
            </label>
            <input
              type="text"
              className="form-control"
              id="titleInput"
              onChange={this.handleChangeTitle}
              required
            />
          </div>
          <p className="small-font">The page will reload on successful save.</p>
          <button type="submit" className="btn btn-success">
            <i className="fas fa-save" />
            &nbsp;Save graph
          </button>
          <br />
        </form>
      );
    } else {
      return (
        <div className="alert alert-info" role="alert">
          {this.state.message}
        </div>
      );
    }
  }

  render() {
    return this.showForm();
  }
}

export default SaveVisualization;
