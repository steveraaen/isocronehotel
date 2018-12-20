import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import { Button, Jumbotron, Table } from 'react-bootstrap';
import './CompStyles.css';

export default class Details extends Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		if(this.props.dtls) {
			var deets = this.props.dtls.data.map((place, idx) => {
				return(
					<tr key={idx}>
						<td>{Math.floor(place.distance)}</td>
						<td>{place.rating}</td>
						<td>{place.name}</td>
						<td>{place.categories[0].title}</td>
						<td>{place.review_count}</td>
						<td>{place.price}</td>
					</tr>)
			})
		}else {
		return (
			<div></div>
			)		
		}
		if(this.props.curHotel) {
				return (
				<div>
					<Jumbotron >
						<h1>{this.props.curHotel.name}</h1>
						<h2>{this.props.curHotel.location.address1}</h2>
						<h3>Yelp Rating: {this.props.curHotel.rating}</h3>
						<span className="price">Cost: {this.props.curHotel.price}</span>
					</Jumbotron>
						
						<div className="details">
						<Table>
						
						<thead>	
							<tr>
								<th>Distance</th>
								<th>Rating</th>
								<th>Name</th>
								<th>Type</th>
								<th>Yelp Reviews</th>
								<th>Price</th>
							</tr>
						</thead>
					
						<tbody>
						{deets}
						</tbody>
				
					</Table>
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