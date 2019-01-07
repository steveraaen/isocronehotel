import React, { Component } from 'react';

import './CompStyles.css';

export default class RestaurantTable extends Component {
	connstructor(props) {
		super(props)
	}
	render() {
        if (this.props.dtls && this.props.resGeoObj) {


         console.log(this.props.resGeoObj.features)
         var deets = this.props.resGeoObj.features.map((place, idx) => {
             return (
            <tr key={idx} onMouseEnter={() => console.log(place)} style={{color: 'white', backgroundColor: place.properties.ratingCol, fontSize: '26px'}}>
					<td>{Math.floor(place.properties.distance)}</td>
					<td>{place.properties.rating}</td>
					<td style={{textOverflow: 'ellipsis'}}>{place.properties.name}</td>
					<td>{place.properties.type}</td>
					<td>{place.properties.review_count}</td>
					<td>{place.properties.price}</td>
				</tr>
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
					</div>)
         })
        } else {
            return null
        }
	}
}