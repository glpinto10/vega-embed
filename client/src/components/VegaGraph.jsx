import React, { Component } from 'react';
import vegaEmbed from 'vega-embed';

class VegaGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spec: props.spec
    };
  }

  buildGraph() {
    vegaEmbed(this.div, this.state.spec, { defaultStyle: true }).catch(
      console.warn
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        spec: nextProps.spec
      },
      () => this.buildGraph()
    );
  }

  componentDidMount() {
    this.buildGraph();
  }

  render() {
    return <div ref={div => (this.div = div)} />;
  }
}

export default VegaGraph;
