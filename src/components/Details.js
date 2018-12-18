import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import './CompStyles.css';


export default class Details extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		if(this.props.curHotel) {
				return (
					<div className="card">
					<img src={this.props.curHotel.image_url} height="24px" width="24px"/>
						<div className="title">{this.props.curHotel.name}</div>
						<div className="content">
							<div className="rating">Yelp Rating: {this.props.curHotel.rating}</div>
							<div className="price">Cost: {this.props.curHotel.price}</div>
						</div>
					</div>
					)

	} else {
		return (
			<div></div>
			)		
	}
	}
}