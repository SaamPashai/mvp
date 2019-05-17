import React, { Component } from 'react';

import firebase from 'firebase/app';
import { Table } from 'antd';
import 'antd/dist/antd.css';

export class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userTasks: []
    }
  }

  // Listens to changes in FireBase data
  componentDidMount() {
    let userId = this.props.currentUser.uid;
    this.tasksRef = firebase.database().ref(`user/${userId}/schools/${this.props.schoolName}/tasks`);
    this.tasksRef.on('value', snapshot => {
      let userTasks = snapshot.val();
      this.setState(state => {
        state.userTasks = userTasks;
        return state;
      });
    });
  }

  componentWillUnmount() {
    this.tasksRef.off(); // turns off the listener
  }

	render() {
    // Making table
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'Description',
      dataIndex: 'desc',
      key: 'desc',
    }, {
      title: 'Date/Time',
      dataIndex: 'dateTime',
      key: 'dateTime',
    }];

    let data = [];
    if (this.state.userTasks !== null) {
      let userTaskKeys = Object.keys(this.state.userTasks);
      if (userTaskKeys.length !== 0) {
        let keyCounter = 0; // needed for to make rows in table
        userTaskKeys.forEach((key) => {
          keyCounter++;
          let time = new Date(this.state.userTasks[key].time);
          let taskObj = {
            id: key, // this is going to be used to delete tasks when they're selected
            key: keyCounter,
            name: this.state.userTasks[key].taskName,
            desc: this.state.userTasks[key].description,
            dateTime: time.toString()
          }

          if (this.state.userTasks[key].subtasks !== undefined) { // adding subtasks to rows
            let children = [];
            let subtasks = this.state.userTasks[key].subtasks;
            let subtaskId = 0;
            subtasks.forEach((subtask) => {
              subtaskId++;
              keyCounter++;
              children.push({
                taskId: key,
                subtaskId, // this is going to be used to delete subtasks when they're selected
                key: keyCounter,
                name: subtask
              });
            });
            taskObj.children = children;
          }

          data.push(taskObj);
        });
      }
    }

    // rowSelection objects indicates the need for row selection
    let rowSelection = {
      onSelect: (record, selected, selectedRows) => {
        if (selected) { // if the checkbox is checked
          // console.log(`Record: ${record}`);
          // console.log(`Selected: ${selected}`);
          // console.log(`Selected rows: ${selectedRows}`);
          if (!record.subtaskId) { // if you're deleting a whole task
            console.log('task!');
            let userId = this.props.currentUser.uid;
            firebase.database().ref(`user/${userId}/schools/${this.props.schoolName}/tasks/${record.id}`).remove();
          } else {
            console.log('subtask!');
          }
        }
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      },
    };

		return (
			<div>
        <Table columns={columns} rowSelection={rowSelection} dataSource={data} />
			</div>
		);
	}
}