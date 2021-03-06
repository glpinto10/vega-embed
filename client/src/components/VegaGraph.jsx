import React, { Component } from 'react';
import vegaEmbed from 'vega-embed';
import SaveVisualization from './SaveVisualization';

class VegaGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spec: {},
      error: '',
      success: false,
      data: [],
      showDirectly: props.showDirectly
    };
  }

  buildGraph() {
    if (!this.state.showDirectly) {
      if (this.validateCorrectSpec()) {
        let spec = this.state.spec;
        let data = this.state.data;
        if (data && data.length > 1) {
          let values = this.operateSpecAndData(spec, data);
          if (values !== null) {
            // The used data is the one that comes from the file
            spec.data = {};
            spec.data.values = values;
            vegaEmbed(this.div, this.state.spec, { defaultStyle: true })
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
                  spec: spec
                })
              );
          }
        } else {
          this.setState({
            error: 'There is no data to show. Please upload a file.',
            success: false
          });
          this.div.textContent = '';
        }
      }
    } else {
      vegaEmbed(this.div, this.state.spec, { defaultStyle: true })
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
            spec: this.state.spec
          })
        );
    }
  }

  operateSpecAndData(spec, data) {
    let encodedCSV = data[0].length;
    let encoding = spec.encoding;
    let keys = Object.keys(encoding);

    // Checks if the number of encoding channels of the uploaded file and of the spec are the same
    if (encodedCSV !== keys.length) {
      this.setState({
        error:
          'The number of encoding channels and the number of elements passed as encoded channels on the CSV file are different.',
        success: false
      });
      this.div.textContent = '';
      return null;
    }

    // Checks if the encoding fields are the same for the uploaded file and for the spec
    for (let index = 0; index < encodedCSV; index++) {
      if (data[0][index] !== encoding[keys[index]].field) {
        this.setState({
          error:
            'The fields do not match the values of the CSV. "' +
            data[0][index] +
            '" is different from "' +
            encoding[keys[index]].field +
            '"',
          success: false
        });
        this.div.textContent = '';
        return null;
      }
    }

    let valuesX = [];

    // Create a data array that can be use to construct the graph
    for (let y = 1; y < data.length; y++) {
      const element = data[y];
      if (element.length !== encodedCSV) {
        this.setState({
          error:
            'There is a problem with row ' +
            (y + 1) +
            '. ' +
            element.toString(),
          success: false
        });
        this.div.textContent = '';
        return null;
      } else {
        let value = {};
        for (let k = 0; k < encodedCSV; k++) {
          let keyK = keys[k];
          value[encoding[keyK].field] = element[k];
        }
        valuesX.push(value);
      }
    }

    return valuesX;
  }

  validateCorrectSpec() {
    let spec = this.state.spec;

    // Verifies that the spec is not a not valid JSON. Check if it is not an empty array or an empty object
    if (
      !spec ||
      spec === null ||
      spec === '' ||
      this.isEmpty(spec) ||
      spec.constructor.toString().indexOf('Array') !== -1
    ) {
      this.setState({
        error: 'The JSON is not valid for making a graph.'
      });
      this.div.textContent = '';
      return false;
    } else if (!spec.encoding || this.isEmpty(spec.encoding)) {
      // Checks that there exists an encoding attribute
      this.setState({
        error: 'There is no encoding on the spec or it is not defined.',
        success: false
      });
      this.div.textContent = '';
      return false;
    }

    return true;
  }

  // Method for checking if an object is empty
  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  componentDidMount() {
    this.buildGraph();
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        spec: nextProps.spec,
        data: nextProps.data
      },
      () => {
        this.buildGraph();
      }
    );
  }

  showOptionsToSave() {
    if (this.state.success) {
      return (
        <div>
          <h5>Store your visualization</h5>
          <SaveVisualization spec={this.state.spec} />
        </div>
      );
    } else {
      return (
        <div className="alert alert-info" role="alert" key="infoSpec">
          <i className="fas fa-info" />
          &nbsp; Only valid visualizations can be stored.
        </div>
      );
    }
  }

  // Method for showing possible errors
  showError() {
    if (this.state.error !== '') {
      return (
        <div className="alert alert-danger" role="alert" key="errorSpec">
          {this.state.error}
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h3>Graph</h3>
        {this.showError()}
        <div className="mt-2" ref={div => (this.div = div)} />
        {this.showOptionsToSave()}
      </div>
    );
  }
}

export default VegaGraph;
