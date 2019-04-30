import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import firebase from 'firebase/app'

export class TaskCreationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      school: 'Garfield', // pass in this prop later. For now the default is Garfield
      subTaskNum: 0
    };

    this.toggle = this.toggle.bind(this);
  }

  // Toggles whether or not the modal is open
  toggle = (event) => {
    if (event.target.id === 'taskSubmitBtn') {
      this.submitTask(event);
    }
    
    if (event.target.id === 'addSubtaskBtn') {
      this.setState(prevState => ({
        subTaskNum: prevState.subTaskNum + 1
      }));
    } else { // if any of the cancel buttons are clicked
      this.setState(prevState => ({
        modal: !prevState.modal,
        subTaskNum: 0
      }));
    }
  }

  // Submits a task to firebase. This is where you define what you should add into the database
  submitTask = (event) => {
    event.preventDefault(); // don't submit yet
    let userId = this.props.currentUser.uid;
    let newTask = {
      school: this.state.school,
      userId,
      time: firebase.database.ServerValue.TIMESTAMP,
      email: this.props.currentUser.email,
      taskName: this.state.taskName,
      description: this.state.taskDesc
    }

    let subtasks = [];
    Object.keys(this.state).forEach(key => {
      if (`${key}`.includes('subtask')) {
        subtasks.push(this.state[key]);
      }
    });

    if (subtasks.length > 0) {
      newTask.subtasks = subtasks;
    }

    firebase.database().ref(`user/${userId}/schools/${this.state.school}`).push(newTask)
      .catch(err => console.log);
  };

  // handles change in user input
  handleChange = (event) => {
    let field = event.target.name; // input being filled out
    let value = event.target.value; // the value inside the input

    let changes = {};
    changes[field] = value;
    this.setState(changes);
  }

  render() {
    const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>
    let subTaskInputs = [];

    for (let i = 0; i < this.state.subTaskNum; i++) { // create subtask elements in modal
      subTaskInputs.push(
        <div className="form-group">
          <label>Subtask #{i + 1}</label>
          <input className="form-control" 
            id={`subtask${i + 1}`}
            name={`subtask${i + 1}`}
            onChange={this.handleChange}
            />
        </div>
      );
    }

    return(
      <div>
        <div id="createBtn">
          <Button color="danger" onClick={this.toggle}>&#43;</Button>
        </div>
        <Modal centered={true} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>Create a task for {this.state.school}</ModalHeader>
          <ModalBody>
            <form>
              {/* Task Name */}
              <div className="form-group">
                <label htmlFor="taskName">Name</label>
                <input className="form-control" 
                  id="taskName" 
                  name="taskName"
                  onChange={this.handleChange}
                  />
              </div>

              {/* Description */}
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea rows="4" cols="50" className="form-control" 
                  id="taskDesc" 
                  name="taskDesc"
                  type="text"
                  onChange={this.handleChange}
                  />
              </div>

              {/* Add subtasks */}
              {subTaskInputs}
              <Button id="addSubtaskBtn" onClick={this.toggle}>Add Subtask</Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button id="taskSubmitBtn" color="primary" onClick={this.toggle}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}