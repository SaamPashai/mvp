import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Route} from "react-router-dom";


import { Homepage } from './Homepage';


export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <React.Fragment>
            <Route exact path="/" component={Homepage} />
          </React.Fragment>
        </Router>
      </div>
    );
  }
}


