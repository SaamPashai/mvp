import React, { Component } from 'react';

// importing components
import { TaskCreationModal } from './TaskCreationModal.js';
import { TaskList } from './TaskList.js'
export class TaskView extends Component {
    render() {
        return (
            <div>
                <TaskCreationModal currentUser={this.props.currentUser} schoolName={this.props.schoolName}/>
                <TaskList currentUser={this.props.currentUser} schoolName={this.props.schoolName}/>
            </div>
        )
    }
}