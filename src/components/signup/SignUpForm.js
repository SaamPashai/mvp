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

  // update state for field
  handleChange = (event) => {
    let field = event.target.name; // input being filled out
    let value = event.target.value; // the value inside the input

    let changes = {};
    changes[field] = value;
    this.setState(changes);
  }

  // handle sign up button. Won't be needed later
  handleSignUp = (event) => {
    event.preventDefault();
    this.props.signUpCallback(this.state.email, this.state.password, this.state.handle);
  }

  // handle signin button. Take this out later on because SPS workers should already have an account
  handleSignIn = (event) => {
    event.preventDefault(); // don't submit yet
    this.props.signInCallback(this.state.email, this.state.password);
  }

  render() {
    return(
      <form>
        {/* email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input className="form-control" 
            id="email" 
            type="email" 
            name="email"
            onChange={this.handleChange}
            />
        </div>

        {/* password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input className="form-control" 
            id="password" 
            type="password"
            name="password"
            onChange={this.handleChange}
            />
        </div>

        {/* handle */}
        <div className="form-group">
          <label htmlFor="handle">Handle</label>
          <input className="form-control" 
            id="handle" 
            name="handle"
            onChange={this.handleChange}
            />
        </div>

        {/* sign in and sign up buttons */}
        <div className="form-group">
          <button className="btn btn-primary mr-2" onClick={this.handleSignUp}>Sign-up</button>
          <button className="btn btn-primary" onClick={this.handleSignIn}>Sign-in</button>
        </div>
      </form>
    );
  }
}