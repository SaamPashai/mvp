import React, { Component } from 'react';

// importing components
import { TaskDropdown } from './TaskDropdown.js'
import { TaskCreationModal } from './TaskCreationModal'
export class TaskView extends Component {
    render() {
        return (
            <div>
                <TaskCreationModal currentUser={this.props.currentUser}/>
                <TaskDropdown />
            </div>
        )
    }
}