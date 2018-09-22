import React, { Component } from 'react';
import VegaGraph from './VegaGraph';
import Papa from 'papaparse';

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jsonToShow: {
        data: {
          name: 'data'
        },
        mark: 'bar',
        encoding: {
          x: { field: 'a', type: 'ordinal' },
          y: { field: 'b', type: 'quantitative' }
        }
      },
      errors: [],
      fileName: 'Choose a CSV file',
      data: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleChange(event) {
    try {
      let showData = JSON.parse(event.target.value);
      this.setState({ jsonToShow: showData, errors: [] });
    } catch (error) {
      let errors = [];
      errors.push(error.toString());
      errors.push(
        'If you had a working visualization. It continues displayed.'
      );
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
          <div className="alert alert-danger" role="alert" key={error}>
            {error}
          </div>
        );
      });
    }
    return errors;
  }

  handleFileUpload(event) {
    const file = event.target.files[0];
    if (file.name.toLowerCase().endsWith('.csv')) {
      Papa.parse(file, {
        complete: results => {
          this.setState({
            fileName: file.name,
            data: results.data
          });
        }
      });
    } else {
      return alert(
        'The file "' +
          file.name +
          '" is not valid. It is not a CSV. Please upload the correct file.'
      );
    }
  }

  render() {
    return (
      <div className="col-12">
        <div className="row">
          <div className="col-md-6 mt-3 col-12">
            <h4>Upload the data</h4>
            <div className="input-group ">
              <br />
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="customFile"
                  onChange={this.handleFileUpload}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  {this.state.fileName}
                </label>
              </div>
            </div>
            <p className="small-font">
              Only the data of the CSV will be used for making the graph
            </p>
            <hr />
            <h4>Define the spec</h4>
            <div className="input-group mt-2">
              <textarea
                className="form-control"
                aria-label="With textarea"
                rows="10"
                onChange={this.handleChange}
              />
            </div>
            <br />
            <h4>Spec working example</h4>
            <img
              src={require('../resources/spec.png')}
              alt="Spec working example"
              width="240px"
            />
          </div>
          <div className="col-md-6 mt-3 col-12">
            {this.showErrors()}
            <VegaGraph
              spec={this.state.jsonToShow}
              data={this.state.data}
              showDirectly={false}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Input;
