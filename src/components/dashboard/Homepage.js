import React, { Component } from 'react';

// CSS imports
import './Homepage.css';
import 'bootstrap';

// Component imports
import { Header } from './Header.js';
import { TaskDropdown } from './TaskDropdown.js';
import { TaskCreationModal }  from './TaskCreationModal.js';

export class Homepage extends Component {
	render() {
		return (
			<div>
				<Header />
				<TaskCreationModal currentUser={this.props.user}/>
				<TaskDropdown />
			</div>
		)
	}
}
