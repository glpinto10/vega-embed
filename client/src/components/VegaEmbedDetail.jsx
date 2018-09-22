import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import vegaEmbed from 'vega-embed';

class VegaEmbedDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.match.params.title,
      username: props.match.params.username,
      spec: {},
      success: false,
      visualization: null,
      error: ''
    };

    this.api = '/vegaEmbed/api/';
  }

  getVisualization() {
    axios
      .get(
        this.api +
          'visualization/title/' +
          this.state.title +
          '/username/' +
          this.state.username
      )
      .then(res => {
        const success = res.data.success;
        if (success) {
          let visu = res.data.visualization;
          let spec = visu.spec;
          spec.width = '400';
          vegaEmbed(this.div, spec, {
            defaultStyle: true
          })
            .catch(error => {
              this.setState({
                error: error.toString(),
                success: false
              });
              this.div.textContent = '';
            })
            .then(
              this.setState({
                error: '',
                success: true,
                visualization: visu
              })
            );
        } else {
          this.setState({
            success: false,
            error: res.data.message
          });
        }
      });
  }

  componentDidMount() {
    this.getVisualization();
  }

  showInfo() {
    if (this.state.success) {
      return (
        <div className="col-m-6 mt-3">
          <h3>Information</h3>
          <p>
            <b>Title: </b>
            {this.state.visualization.title}
          </p>
          <p>
            <b>Author: </b>
            {this.state.visualization.username}
          </p>
          <p>
            <b>Date: </b>
            {this.state.visualization.date}
          </p>
        </div>
      );
    } else {
      return (
        <div className="col-m-6 mt-3">
          <div className="alert alert-danger" role="alert">
            {this.state.error}
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <Link to={'/visualizations'} style={{ textDecoration: 'none' }}>
            <button type="button" className="btn btn-secondary">
              <i className="fas fa-home" />
              &nbsp;Home
            </button>
          </Link>
        </div>
        <div className="col-md-6 mt-3">
          <h3>Graph</h3>
          <div className="mt-2" ref={div => (this.div = div)} />
        </div>
        {this.showInfo()}
      </div>
    );
  }
}

export default VegaEmbedDetail;
