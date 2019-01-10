import React, { Component } from 'react';
import RestaurantStats from './RestaurantStats.js'
import './CompStyles.css';

export default class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {

        if (this.props.curHotel) {
             
            return (
               
					<div style={{paddingLeft: '3vw', color: 'white', backgroundColor: this.props.curHotel.properties.ratingCol, borderWidth: '1px',borderRadius: '12px' }}>
						
                        <h2>{this.props.curHotel.properties.name}</h2>
						<h2>{this.props.curHotel.properties.location.address1}</h2>
						<h3>Yelp Rating: {this.props.curHotel.properties.rating}</h3>
						<span className="price">Cost: {this.props.curHotel.properties.price}</span>			
					</div>						
				
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}