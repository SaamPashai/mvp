import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Card, CardText, 
        CardTitle } from 'reactstrap';
import firebase from 'firebase/app';

export class SchoolView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schools: [],
      schoolName: '',
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    let userId = this.props.currentUser.uid;
    this.schoolsRef = firebase.database().ref(`user/${userId}/schools`);
    this.schoolsRef.on('value', snapshot => {
      let schools = snapshot.val();
      this.setState(state => {
        state.schools = schools;
        return state;
      })
    })
  }

  // toggles whether or not modal is open
  toggle = (event) => {
    if (event.target.id === 'submitSchoolBtn') {
      this.submitSchool(event);
    }
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  // handles change in user input
  handleChange = (event) => {
    let field = event.target.name;
    let value = event.target.value;

    let changes = {};
    changes[field] = value;
    this.setState(changes);
  }

  // Submits a school to the FireBase DB
  submitSchool = (event) => {
    event.preventDefault();

    let userId = this.props.currentUser.uid;
    firebase.database().ref(`user/${userId}/schools/${this.state.schoolName}`).push({ // cannot add empty value, so need to add dummy value
        intializer: true
      })
      .catch(err => console.log);
  }

  render() {
    const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>
    let schools = Object.keys(this.state.schools);
    let schoolCards = [];
    for (let i = 0; i < schools.length; i++) {
      schoolCards.push(
        <div>
          <Card>
            <CardTitle>{schools[i]}</CardTitle>
            <CardText>Example text</CardText>
          </Card>
        </div>
      )
    }

    return (
      <div>
        <div>
          <Button color="danger" onClick={this.toggle}>Add School</Button>
        </div>
        {/* Modal to add school. Opens and closes */}
        <Modal centered={true} isOpen={this.state.modal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle} close={closeBtn}>Add School</ModalHeader>
        <ModalBody>
          <form>
            {/* School name input */}
            <div className="form-group">
              <label htmlFor="schoolName">School Name</label>
              <input className="form-control"
                id="schoolName"
                name="schoolName"
                onChange={this.handleChange}
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button id="submitSchoolBtn" color="primary" onClick={this.toggle}>Submit</Button>{' '}
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>

      {/* School cards */}
      {schoolCards}
    </div>
    );
  }
}