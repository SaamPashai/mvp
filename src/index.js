import React from 'react';
import ReactDOM from 'react-dom';

// importing third-party modules
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// import and configuration for firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
var config = {
  apiKey: "AIzaSyAcU2-EOYtKpOORURR7E0H4w2Ox3_OybQc",
  authDomain: "capstone-team-c04.firebaseapp.com",
  databaseURL: "https://capstone-team-c04.firebaseio.com",
  projectId: "capstone-team-c04",
  storageBucket: "capstone-team-c04.appspot.com",
  messagingSenderId: "49472610971"
};
firebase.initializeApp(config);

ReactDOM.render(<BrowserRouter basename={process.env.PUBLIC_URL+'/'}><App /></BrowserRouter>, document.getElementById('root'));
