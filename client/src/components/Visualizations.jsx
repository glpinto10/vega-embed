import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Visualizations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visualizations: props.visualizations
    };
  }

  processText(val) {
    return val.replace(/ /g, '_');
  }

  showVisualizationsInfo() {
    let visualizations = [];

    this.state.visualizations.forEach(visualization => {
      visualizations.push(
        <div
          className="col-md-3 col-12 mb-3 d-flex align-items-stretch"
          key={visualization.title}
        >
          <Link
            to={
              '/visualization/title/' +
              this.processText(visualization.title) +
              '/username/' +
              this.processText(visualization.username)
            }
            style={{ textDecoration: 'none' }}
          >
            <div className="card zoom">
              <div className="card-body text-dark">
                <p>
                  <b>Title:</b> {visualization.title}
                </p>
                <p>
                  <b>Author:</b> {visualization.username}
                </p>
                <p>
                  <b>Timestamp:</b> {visualization.date}
                </p>
              </div>
            </div>
          </Link>
        </div>
      );
    });

    return visualizations;
  }

  render() {
    return this.showVisualizationsInfo();
  }
}
export default Visualizations;
