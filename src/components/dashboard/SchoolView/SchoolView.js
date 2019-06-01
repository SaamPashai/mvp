import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Card, CardBody,
        CardTitle } from 'reactstrap';
import firebase from 'firebase/app';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Link } from 'react-router-dom';


import test from "./maps/AAA-1-11x17.jpg"

// importing CSS
import './SchoolView.css';

// import data
import json from '../../../data/locations.json';
const fs = require('fs');

export class SchoolView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersSchools: [], // schools to be populated based on FireBase user
      schoolName: '',
      modal: false,
      infoModal: false,
      mapModal: false,
    };

    this.toggle = this.toggle.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.toggleMap = this.toggleMap.bind(this);
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

  componentWillUnmount() {
    this.schoolsRef.off(); // turns off the listener
  }

  toggleInfo = (event) => {
    let schoolName = '';
    if (typeof(event) === 'string') {
      schoolName = event;
    }

    this.setState(prevState => ({
      infoModal: !prevState.infoModal,
      schoolName
    }));
  }

  toggleMap = (event) => {
    let schoolName = '';
    if (typeof(event) === 'string') {
      schoolName = event;
    }

    this.setState(prevState => ({
      mapModal: !prevState.mapModal,
      schoolName
    }));
  }

  // toggles whether or not modal is open
  toggle = (event) => {
    if (Array.isArray(event)) { //
      let schoolName = event[0];
      this.submitSchool(schoolName);
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
    const infoCloseBtn = <button className="close" onClick={this.toggleInfo}>&times;</button>;
    const mapCloseBtn = <button className="close" onClick={this.toggleMap}>&times;</button>;
    
    try {
      console.log(fs);
      let dirContent = fs.readdirSync('./maps');
      dirContent.forEach(path => {
        console.log(path);
      })
    } catch (ex) {
      console.log(ex);
    }

    // Making school cards
    let schoolCards = [];
    let schoolMetaData = []; // storing metadata to get school properties from json file
    if (this.state.usersSchools !== null) {
      let usersSchools = Object.keys(this.state.usersSchools);
      json.forEach(entry => {
        if (usersSchools.includes(entry.name)) {
          schoolMetaData[entry.name] = entry;
        }
      });
      usersSchools.forEach(school => {
        schoolCards.push(
          <div>
            <Card className="schoolCard">
              <CardBody>
                <CardTitle>{school}</CardTitle>
                <Button color="primary">
                  <Link to="/tasks" 
                    onClick={(thisSchool) => this.props.getSchoolNameCallback(school)}>
                    Tasks
                  </Link>
                </Button>
                <Button color="warning" onClick={(thisSchool) => this.toggleMap(school)}>Map</Button>
                <Button color="dark" onClick={(thisSchool) => this.toggleInfo(school)}>Information</Button>
              </CardBody>
            </Card>
          </div>
        );
      });
    }

    // Modal for information on selected school
    let infoModal = <div></div>;
    if (this.state.schoolName !== '') {
      infoModal =     
      <div>
        <Modal centered={true} isOpen={this.state.infoModal} toggle={this.toggleInfo} className={this.props.className}>
          <ModalHeader toggle={this.toggleInfo} close={infoCloseBtn}>School Information</ModalHeader>
          <ModalBody>
            <strong>Cluster:</strong> {schoolMetaData[this.state.schoolName].u_cluster}
            <br/>
            <strong>TS Specialist:</strong> {schoolMetaData[this.state.schoolName].u_ts_specialist}
            <br/>
            <strong>IT Specialist:</strong> {schoolMetaData[this.state.schoolName].u_it_specialist}
            <br/>
            <strong>School Address:</strong> {schoolMetaData[this.state.schoolName].u_address}
            <br/>
            <strong>School Phone Number:</strong> {schoolMetaData[this.state.schoolName].u_phone_number}
            <br/>
            <strong>Site Code:</strong> {schoolMetaData[this.state.schoolName].u_site_code}
            <br/>
            <strong>School Principal:</strong> {schoolMetaData[this.state.schoolName].u_principal}
            <br/>
            <strong>School Secretary:</strong> {schoolMetaData[this.state.schoolName].u_secretary}
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </Modal>
      </div>
    }

    // getting list of school names to suggest during user input
    let schools = []
    json.forEach(entry => {
      schools.push(entry.name);
    });

    // Making display for maps
    
   
    let imageCode = schoolMetaData[this.state.schoolName] ? schoolMetaData[this.state.schoolName].u_site_code : ''
    console.log('./maps/'+imageCode+'-1-11x17.jpg');
    return (
      <div>
        <div>
          <Button color="danger" onClick={this.toggle}>Add School</Button>
          <button className="btn btn-warning" id="log-out-btn" onClick={this.props.signOutCallback}>
            <Link to="/">Log Out {this.props.currentUser.email}</Link>
          </button>
        </div>

        {/* Modal to add school. Opens and closes */}
        <Modal centered={true} isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>Add School</ModalHeader>
          <ModalBody>
            <form>
              <Typeahead 
                id="school"
                placeholder='Type here...'
                onChange={this.toggle}
                options={schools}
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>

        {/* Modal for information on school */}
        {infoModal}
  
        {/* Modal for map of school clicked */}
        <Modal centered={true} isOpen={this.state.mapModal} toggle={this.toggleMap}>
          <ModalHeader toggle={this.toggleMap} close={mapCloseBtn}>Map(s)</ModalHeader>
          <ModalBody>
            <img src={ require('./maps/'+imageCode+'-1-11x17.jpg') } alt="map" id="mapPic"></img>
            {/* {"data/maps/"+imageCode+"-1-11x17.jpg"} */}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleMap}>Cancel</Button>
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