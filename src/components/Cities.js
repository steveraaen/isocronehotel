import React, { Component } from 'react';
import choices from '../selections.js'


export default class Cities extends Component {
	constructor(props) {
		super(props)
		this.state = {
			city: choices.cities[0].name
		}
		this.handleClick = this.handleClick.bind(this)
	}
	handleClick(c, l) {
		
		this.props.getSelectedCity(c, l)
	}

	render() {
		var cityList = choices.cities.map((cty, idx) => {
			return (<a key={idx} href="#" onClick={() => this.handleClick(cty.name, cty.location)}> <li>{cty.name}</li></a>)
		})
		return (
		
				<div style={{color: 'black'}}>
					<ul style={{listStyleType: "none", color: 'black'}} >{cityList}</ul>
				</div>
		
			)
	}
}