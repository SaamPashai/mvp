import React, { Component } from 'react';

export class SignUpForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      'email': undefined,
      'password': undefined,
      'handle': undefined,
      'avatar': '' //default to blank value
    }; 
  }

  render() {
    return(
      <div>
        
      </div>
    )
  }
}