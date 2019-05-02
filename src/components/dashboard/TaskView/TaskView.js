import React, { Component } from 'react';

// importing components
import { TaskCreationModal } from './TaskCreationModal'
export class TaskView extends Component {
    render() {
        console.log(this.props.schoolName);
        return (
            <div>
                <TaskCreationModal currentUser={this.props.currentUser} schoolName={this.props.schoolName}/>
            </div>
        )
    }
}