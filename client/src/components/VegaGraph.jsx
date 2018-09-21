import React, { Component } from 'react';
import vegaEmbed from 'vega-embed';

class VegaGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spec: {},
      errors: []
    };
  }

  buildGraph() {
    //this.validateSpec();
    vegaEmbed(this.div, this.state.spec, { defaultStyle: true }).catch(
      console.warn
    );
  }

  validateCorrectSpec() {
    let spec = this.state.spec;
    let errores = [];
    if (
      spec &&
      spec !== null &&
      spec !== '' &&
      !this.isEmpty(spec) &&
      spec.constructor.toString().indexOf('Array') === -1
    ) {
      errores.push('The JSON is not valid for making a graph.');
    }
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        spec: nextProps.spec
      },
      () => this.buildGraph()
    );
  }

  render() {
    return (
      <div>
        <h3>Graph</h3>
        <div className="mt-2" ref={div => (this.div = div)} />
      </div>
    );
  }
}

export default VegaGraph;
