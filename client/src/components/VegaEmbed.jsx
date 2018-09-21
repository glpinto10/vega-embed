import React, { Component } from 'react';
import VegaGraph from './VegaGraph';

class VegaEmbed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jsonToShow: {}
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    try {
      let showData = JSON.parse(event.target.value);
      this.setState({ jsonToShow: showData });
    } catch (error) {
      console.log(error);
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
              rows="30"
              value={this.state.page}
              onChange={this.handleChange}
            >
              []
            </textarea>
          </div>
        </div>
        <div className="col-6 text-center mt-3">
          <VegaGraph spec={this.state.jsonToShow} />
        </div>
        <div className="col-12 mt-5" />
      </div>
    );
  }
}

export default VegaEmbed;
