import React, { Component } from 'react';
import { Well } from 'react-bootstrap';

export default class HotelInfo extends Component {
	constructor(props) {
		super(props) 
	}
	render() {
		if(this.props.hoverHotel) {
		return(
			<Well style={{backgroundColor: this.props.hoverHotel.properties.ratingCol, textAlign: 'center', fontWeight: 'bold'}}>
				<h2>{this.props.hoverHotel.properties.name}</h2>
				<h3>{this.props.hoverHotel.properties.location.address1}</h3>
				<h3>{this.props.hoverHotel.properties.rating}</h3>
			</Well>
			)
	} else return null
	}
}
