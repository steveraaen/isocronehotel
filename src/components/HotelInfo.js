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
				<h3>{this.props.hoverHotel.properties.name}</h3>
				<h3>{this.props.hoverHotel.properties.rating}</h3>
			</Well>
			)
	} else return null
	}
}
