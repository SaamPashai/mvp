import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class TaskCreationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      school: 'Garfield', // pass in this prop later. For now the default is Garfield
      subTaskNum: 0,
    };

    this.toggle = this.toggle.bind(this);
  }

  // Toggles whether or not the modal is open
  toggle = (event) => {
    if (event.target.id === 'taskSubmitBtn') {
      console.log('true!');
    } else if (event.target.id === 'addSubtaskBtn') {
      this.setState(prevState => ({
        subTaskNum: prevState.subTaskNum + 1
      }));
    } else {
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
    }
  }

  // Submits a task to firebase
  submitTask = () => {

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
    for (let i = 0; i < this.state.subTaskNum; i++) {
      subTaskInputs.push(<li>Subtask {i + 1}</li>);
    }

    return(
      <div>
        <Button color="danger" onClick={this.toggle}>Create Task</Button>
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
              <ol>
                {subTaskInputs}
              </ol>
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