import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import './CompStyles.css';

export default class Details extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		if(this.props.dtls) {

			var deets = this.props.dtls.data.map((place, idx) => {
				return(<div key={idx}>
							<span className="deta" style={{width: place.distance * .05 + "px", backgroundColor: 'lightBlue'}}>{Math.floor(place.distance)}</span>
							<span className="deta">{place.price}</span>
							<span className="deta"style={{width: place.rating * 10 + "px", backgroundColor: 'coral'}}>{place.rating}</span>
							<span className="deta">{place.name}</span>
							<span className="deta">{place.categories[0].title}</span>
							<span className="deta" style={{width: place.review_count * 5 + "px", backgroundColor: 'lightBlue'}}>{place.review_count}</span>
						</div>)
			})
		}else {
		return (
			<div></div>
			)		
		}
		if(this.props.curHotel) {
				return (
				<div>
					<div className="card">
						<div className="title">{this.props.curHotel.name}</div>
						<div className="content">
							<div className="rating">Yelp Rating: {this.props.curHotel.rating}</div>
							<div className="price">Cost: {this.props.curHotel.price}</div>
							</div>
						</div>
						<div className="details" style={{display: "flex", flexDirection: 'column'}}>
						{deets}
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