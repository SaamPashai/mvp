import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// importing third party packages
import firebase from 'firebase/app';
import { Homepage } from './components/dashboard/Homepage.js';
import { SignUpForm } from './components/signup/SignUpForm.js'
import { Spinner } from 'reactstrap';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		};
	}

	// handle user logging in and out
	componentDidMount() {
		this.authUnRegFunc = firebase.auth().onAuthStateChanged(fireBaseUser => {
			if (fireBaseUser) { // if firebase user is logged in
				this.setState(state => {
					state.user = fireBaseUser;
					state.loading = false;
					return state;
				});
			} else {
				this.setState(state => {
					state.user = null;
					state.loading = false;
					return state;
				});
			}
		});
	}

	// handle logging in and out
	componentWillUnmount() {
		this.authUnRegFunc.off();
	}

  // A callback function for registering new users. Won't be needed for our purposes but I'll put 
  // it here for now incase we want to implement SPS employee signup
	handleSignup = (email, password, handle) => {
		this.setState({errorMessage: null}); // clears old errors

		return firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(userCreds => {
				let user = userCreds.user;
				return user.updateProfile({
					displayName: handle
				});
			})
			.catch(err => {
				this.setState(state => {
					state.errorMessage = err.message;
					return state;
				});
			});
	}

	// A callback function for logging in a user
	handleSignIn = (email, password) => {
		this.setState({errorMessage: null}); //clear any old errors

		/* TODO: sign in user here */
		firebase.auth().signInWithEmailAndPassword(email, password)
			.catch(err => {
				this.setState(state => {
				state.errorMessage = err.message;
				return state;
			});
		});
	}

	//A callback function for logging out the current user
	handleSignOut = () => {
		this.setState({errorMessage: null}); //clear any old errors

		firebase.auth().signOut()
		.catch(err => {
			this.setState(state => {
			state.errorMessage = err.message;
			return state;
			});
		});
	}

	render() {
		let content = null; // content to render

		// If this page is currently loading, show a spinner
		if (this.state.loading) {
			return(
				<div className="text-center">
					<Spinner color="warning" size="lg"/>
				</div>
			);
    }
    
    if (!this.state.user) { // if user not logged in
      content = (
        <div className="container">
          <h1>Sign Up (SPS Employees)</h1>
            <SignUpForm 
              signUpCallback={this.handleSignup}
              signInCallback={this.handleSignIn}
            />
        </div>
      );
    } else { // renders dashboard content if logged in
      content = (
				<div>
					<Homepage />
					{this.state.user &&
						<button className="btn btn-warning" onClick={this.handleSignOut}>
							Log Out {this.state.user.displayName}
						</button>
					}
				</div>
      );
    }

    return( // render any error messages plus content
      <div>
        {
          this.state.errorMessage &&
          <p className="alert alert-danger">{this.state.errorMessage}</p>
        }
        {content}
      </div>
    );
	}
}


