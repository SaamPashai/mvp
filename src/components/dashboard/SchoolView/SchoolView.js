import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Card, CardText, 
        CardTitle } from 'reactstrap';
import firebase from 'firebase/app';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Link } from 'react-router-dom';

// importing CSS
import './SchoolView.css';

export class SchoolView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schools: ['Garfield', 'Ballard', "Franklin"], // schools to be populated from JSON
      usersSchools: [], // schools to be populated based on FireBase user
      schoolName: '',
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    let userId = this.props.currentUser.uid;
    this.schoolsRef = firebase.database().ref(`user/${userId}/schools`);
    this.schoolsRef.on('value', snapshot => {
      let usersSchools = snapshot.val();
      this.setState(state => {
        state.usersSchools = usersSchools;
        return state;
      })
    })
  }

  // toggles whether or not modal is open
  toggle = (event) => {
    if (Array.isArray(event)) { //
      this.submitSchool(event[0]);
    }

    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  // Submits a school to the FireBase DB
  submitSchool = (school) => {
    let userId = this.props.currentUser.uid;
    firebase.database().ref(`user/${userId}/schools/${school}`).push({ // cannot add empty value, so need to add dummy value
        initializer: true
      })
      .catch(err => console.log);
  }

  render() {
    const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>

    // Making school cards
    let schoolCards = [];
    if (this.state.usersSchools !== null) {
      let usersSchools = Object.keys(this.state.usersSchools);
      usersSchools.forEach(school => {
        schoolCards.push(
          <div>
            <Link to="/tasks">
              <Card className="schoolCard">
                <CardTitle>{school}</CardTitle>
                <CardText>Example text</CardText>
              </Card>
            </Link>
          </div>
        );
      });
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
            <Typeahead 
              id="schoolName"
              name="schoolName"
              placeholder='Type here...'
              onChange={this.toggle}
              options={this.state.schools}
            />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>

      {/* School cards */}
      <div className="container">
        {schoolCards}
      </div>
    </div>
    );
  }
}