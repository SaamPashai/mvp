import React, { Component } from 'react';

export class Header extends Component {
  render() {
    return(
      <div id="border">
        <img className="logo" src="./img/spslogo.png" alt="SPS logo" />
        <h1 className="text-center" id="please">Seattle Public Schools Management</h1>
        <br/>
      </div>
    );
  }
}