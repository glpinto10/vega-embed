import React, { Component } from 'react';
import VegaGraph from './VegaGraph';

class InputJSON extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jsonToShow: null,
      errors: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    try {
      let showData = JSON.parse(event.target.value);
      this.setState({ jsonToShow: showData, errors: [] });
    } catch (error) {
      let errors = [];
      errors.push(error.toString());
      this.setState({
        errors: errors
      });
    }
  }

  showErrors() {
    let errors = [];
    if (this.state.errors.length > 0) {
      errors.push(<h5 key="jsonNotValid">The JSON is not valid:</h5>);
      this.state.errors.forEach(error => {
        errors.push(
          <div className="alert alert-danger mb-5" role="alert" key={error}>
            {error}
          </div>
        );
      });
    }
    return errors;
  }

  validateJson() {}

  render() {
    return (
      <div className="col-12">
        <div className="row">
          <div className="col-md-6 mt-3 col-12">
            <h3>Write the JSON</h3>
            <div className="input-group mt-2">
              <textarea
                className="form-control"
                aria-label="With textarea"
                rows="20"
                value={this.state.page}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="col-md-6 mt-3 col-12">
            {this.showErrors()}
            <VegaGraph spec={this.state.jsonToShow} />
          </div>
        </div>
      </div>
    );
  }
}

export default InputJSON;
