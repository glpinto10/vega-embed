import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import VegaEmbed from './components/VegaEmbed';
import VegaEmbedDetail from './components/VegaEmbedDetail';

class App extends Component {
  render() {
    return (
      <div>
        <div className="bg-dark-blue shadow text-light">
          <br />
          <h1 className="text-center">Vega Embed</h1>
          <h5 className="text-center raleway">
            By{' '}
            <i>
              <a
                href="https://glpinto10.github.io/gabriel-pinto-pineda/"
                className="text-light"
                target="blank"
              >
                Gabriel Pinto Pineda
              </a>
            </i>
            <br />
            <br />
          </h5>
        </div>
        <div className="container container-fluid mb-5">
          <Route exact path="/" component={VegaEmbed} />
          <Switch>
            <Route exact path="/visualizations" component={VegaEmbed} />
            <Route
              path="/visualization/title/:title/username/:username"
              component={VegaEmbedDetail}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
