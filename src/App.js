import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';

import { Homepage } from './Homepage.js';
//import { Login } from './Login.js'

export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/* <Route exact path="/" render={}/> */}
          <Route exact path="/" component={Homepage} />
        </Switch>
      </div>
    );
  }
}


