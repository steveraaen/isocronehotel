import React, { Component } from 'react';
import { Jumbotron, Table } from 'react-bootstrap';
import './CompStyles.css';

export default class Details extends Component {

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
				<div style={{maxWidth: "30vw"}}>
					<Jumbotron style={{paddingLeft: '3vw'}}>
						<h1>{this.props.curHotel.properties.name}</h1>
						<h2>{this.props.curHotel.properties.location.address1}</h2>
						<h3>Yelp Rating: {this.props.curHotel.properties.rating}</h3>
						<span className="price">Cost: {this.props.curHotel.properties.price}</span>
					</Jumbotron>
						
						<div className="details">
						<Table style={{maxWidth: "30vw"}}>
						
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