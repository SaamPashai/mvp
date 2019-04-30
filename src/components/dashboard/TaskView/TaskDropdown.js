import React, { Component } from 'react';

// importing third-party packages
import * as d3 from 'd3';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Table from 'rc-table';

export class TaskDropdown extends Component {
	constructor(props) {
		super(props);
		this.toggle3 = this.toggle3.bind(this);
		this.state = {
			data: [],
			saveData: [],
			select: [],
			dropdownOpen3: false,
			schoolVar: "",
		}
	}

	toggle3() {
		this.setState(prevState => ({
			dropdownOpen3: !prevState.dropdownOpen3
		}));
	}

	componentDidMount() {
		d3.csv('data/dummyData.csv').then((d) => {
			this.setState({ data: d });
			this.setState({ saveData: d });
		});
	}

	setTable(d) {
		this.setState({
			schoolVar: d
		});
	}

	render() {
		let columns = [
			{ title: 'Task Description', dataIndex: 'name', key: 'name', width: 200 }, 
			{ title: 'Percent Done', dataIndex: 'percentage', key: 'percentage', width: 200 }
		];

		let dataT = [{}];
		if (this.state.schoolVar === 'Ballard') {
			dataT = [
				{ name: 'Restock Computers', percentage: 25 },
				{ name: 'Finish catalog', percentage: 50 },
				{ name: 'Set up NAT', percentage: 60 },
				{ name: 'Train new employees', percentage: 95 },
			];
		} else if (this.state.schoolVar === 'Garfield') {
			dataT = [
				{ name: 'Reboot Network', percentage: 10 },
				{ name: 'Remove old data', percentage: 5 },
				{ name: 'Write scripts', percentage: 20 },
			];
		} else if (this.state.schoolVar === 'Franklin') {
			dataT =[
				{ name: 'Fix Laptops', percentage: 25 },
				{ name: 'Provide new data', percentage: 75 },
			];
		} else if (this.state.schoolVar === 'Lincoln') {
			dataT = [
				{ name: 'Open new servers', percentage: 80 },
			];
		}
		
		return (
			<div id="body">
				<br/>
				<div className="text-center form-inline">
					School:	
					<Dropdown direction="down" isOpen={this.state.dropdownOpen3} toggle={this.toggle3} className="but" size="sm">
						<DropdownToggle caret>
								Select
						</DropdownToggle>
						<DropdownMenu>
							{['Ballard', 'Garfield', 'Franklin', 'Lincoln'].map((d) => {
									return <DropdownItem onClick={() => this.setTable(d)}>{d}</DropdownItem>
								})
							}
						</DropdownMenu>
					</Dropdown>
				</div>
				<br/>
				<div className="text-center right">
					<h2 >Tasks:</h2>
					<div className="form-inline">
						<Table columns={columns} data={dataT} />
					</div>
				</div>
			</div >
		);
    }
}