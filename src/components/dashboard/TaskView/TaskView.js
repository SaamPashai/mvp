import React, { Component } from 'react';

import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

// importing components
import { TaskCreationModal } from './TaskCreationModal.js';
import { TaskList } from './TaskList.js'

// importing CSS
import './TaskView.css';

export class TaskView extends Component {
  render() {
    return (
      <div>
        <Button color="danger">
          <Link to="/">Back</Link>
        </Button>
        <TaskCreationModal currentUser={this.props.currentUser} schoolName={this.props.schoolName}/>
        <TaskList currentUser={this.props.currentUser} schoolName={this.props.schoolName}/>
      </div>
    )
  }
}