import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// importing third party packages
import firebase from 'firebase/app';
import { SignUpForm } from './components/signup/SignUpForm.js'
import { Spinner } from 'reactstrap';
import { Switch, Route, Link } from 'react-router-dom'

// importing components
import { Header } from './components/dashboard/Header.js';
import { TaskView } from './components/dashboard/TaskView/TaskView.js'
import { SchoolView } from './components/dashboard/SchoolView/SchoolView.js';

// import css files
import './index.css';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			schoolName: ''
		};
	}

	// Callback handler for getting school from SchoolView to put into TaskView
	getSchoolName(schoolName) {
		this.setState(state => {
			state.schoolName = schoolName;
			return state;
		});
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
				return user;
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
		// If this page is currently loading, show a spinner
		if (this.state.loading) {
			return(
				<div className="text-center">
					<Spinner color="warning" size="lg"/>
				</div>
			);
    }
    
    if (!this.state.user) { // if user not logged in
      return (
        <div className="container">
          <h1>Sign Up (SPS Employees)</h1>
            <SignUpForm 
              signUpCallback={this.handleSignup}
              signInCallback={this.handleSignIn}
            />
        </div>
      );
    } else { // renders dashboard content if logged in
      return (
				<div>
					<Header />
					<Switch>
						<Route exact path ="/" render={() => { return (
							<main>
								<SchoolView 
									currentUser={this.state.user} 
									getSchoolNameCallback={(schoolName) => this.getSchoolName(schoolName)}
								/>
							</main>
						)}}/>
						<Route path="/tasks" 
							render={
								(props) => <TaskView schoolName={this.state.schoolName} currentUser={this.state.user}/>
							}
						/>
					</Switch>
					<button className="btn btn-warning" onClick={this.handleSignOut}>
						<Link to="/">Log Out {this.state.user.email}</Link>
					</button>
				</div>
      );
    }
	}
}


