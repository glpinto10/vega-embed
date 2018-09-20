import React, { Component } from 'react';
import VegaEmbed from 'vega-embed';

class VegaLite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jsonToShow: { error: 'Empty JSON' }
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let json;
    try {
      json = JSON.parse(event.target.value);
      this.setState({ jsonToShow: json });
    } catch (error) {
      json = { error: 'Error in JSON' };
      this.setState({ jsonToShow: json });
    }
  }

  visualization() {}

  //   componentDidMount() {
  //     this.div.textContent = JSON.stringify(this.state.jsonToShow);
  //   }

  render() {
    return (
      <div className="row">
        <div className="col-12 mb-3">
          <h2 className="text-center">Insert JSON</h2>
        </div>
        <div className="col-6">
          <div className="input-group">
            <textarea
              className="form-control"
              aria-label="With textarea"
              rows="10"
              value={this.state.page}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="col-6">{JSON.stringify(this.state.jsonToShow)}</div>
        {/* <div ref={div => (this.div = div)} /> */}
        <div className="col-12">
          <hr />
          <h2 className="text-center">VEGA GRAPH</h2>
        </div>
      </div>
    );
  }
}

export default VegaLite;
