import React, { Component } from 'react';

// CSS imports
import './Homepage.css';
import 'bootstrap';

// Component imports
import { Header } from './Header.js';
import { TaskDropdown } from './TaskDropdown.js';
import { TaskCreationModal }  from './TaskCreationModal.js';
import { SchoolView } from './SchoolView/SchoolView.js';

export class Homepage extends Component {
	render() {
		return (
			<div>
				<Header />
				<SchoolView currentUser={this.props.user}/>
				{/* <TaskCreationModal currentUser={this.props.user}/>
				<TaskDropdown /> */}
			</div>
		)
	}
}
