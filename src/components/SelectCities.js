import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import europe from '../europe'
import './CompStyles.css';

export default class SelectCities extends Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)	

	}
	handleClick(c, l) {		
		this.props.getMapAndIso(c, l)
			console.log('clicked')
	}	
	componentDidMount() {
		console.log(europe)
		var buttonsSet = new Set()
		europe.map((cty, idx) => {
			if(!buttonsSet.country) {
				buttonsSet.add(cty.country + ", " + cty.iso2)
			}
			console.log(buttonsSet)
		})
	}	
		render() {
console.log(this.dd)


			return (
				<div style={{fontSize: '18pt'}}>
					{this.dd}
				</div>
				)
	}
}