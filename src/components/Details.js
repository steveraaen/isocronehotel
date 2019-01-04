import React, { Component } from 'react';
import { Jumbotron, Table, Well } from 'react-bootstrap';
import RestaurantStats from './RestaurantStats.js'
import './CompStyles.css';

export default class Details extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

    render() {

        if (this.props.dtls && this.props.resGeoObj) {
            console.log(this.props.resGeoObj.features)
            var deets = this.props.resGeoObj.features.map((place, idx) => {
                return (
                    <tr key={idx} onMouseEnter={() => console.log(place)} style={{color: 'white', backgroundColor: place.properties.ratingCol}}>
						<td>{Math.floor(place.properties.distance)}</td>
						<td>{place.properties.rating}</td>
						<td style={{textOverflow: 'ellipsis'}}>{place.properties.name}</td>
						<td>{place.properties.type}</td>
						<td>{place.properties.review_count}</td>
						<td>{place.properties.price}</td>
					</tr>)
            })
        } else {
            return (
                <div></div>
            )
        }
        if (this.props.curHotel) {
            return (
                <div style={{maxWidth: "30vw"}}>
					<Well style={{paddingLeft: '3vw', color: 'white', backgroundColor: this.props.curHotel.properties.ratingCol, borderWidth: '1px',borderRadius: '12px' }}>
						<h2>{this.props.curHotel.properties.name}</h2>
						<h2>{this.props.curHotel.properties.location.address1}</h2>
						<h3>Yelp Rating: {this.props.curHotel.properties.rating}</h3>
						<span className="price">Cost: {this.props.curHotel.properties.price}</span>
					</Well>			
					<RestaurantStats />			
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