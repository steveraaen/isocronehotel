import React, { Component } from 'react';
import { Well } from 'react-bootstrap';

export default class HotelInfo extends Component {
	constructor(props) {
		super(props) 
	}
	render() {
		if(this.props.hoverHotel) {
		return(
			<Well>
				<h2>{this.props.hoverHotel.name}</h2>
			</Well>
			)
	} else return null
	}
}
