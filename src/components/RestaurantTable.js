import React, { Component } from 'react';
import { Table } from 'react-bootstrap'
import './CompStyles.css';

export default class RestaurantTable extends Component {
	constructor(props) {
		super(props)
		this.handleMouseEnter = this.handleMouseEnter.bind(this)
	}
	handleMouseEnter(rst) {
		this.props.expandRestCircle(rst)
	}
	render() {
        if (this.props.dtls && this.props.resGeoObj) {
     
         var deets = this.props.resGeoObj.features.map((place, idx) => {
             return (
            <tr key={idx} onMouseEnter={() => this.handleMouseEnter(place)} style={{color: 'white', backgroundColor: place.properties.ratingCol, fontSize: '22px'}}>
					<td>{Math.floor(place.properties.distance)}</td>
					<td>{place.properties.rating}</td>
					<td style={{textOverflow: 'ellipsis'}}>{place.properties.name}</td>
					<td>{place.properties.type}</td>
					<td>{place.properties.review_count}</td>
					<td>{place.properties.price}</td>
				</tr>)
          })
        } else {
            deets =  (<tr><th>Nothing to show</th></tr>) 
        }
        		return(
					<div className="details" >
						<Table>						
						<thead style={{backgroundColor: '#121B59', color: 'yellow'}}>	
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
					</div>)

	}
}