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
               
					<div style={{padding: '3vw', color: 'black', textAlign: 'center', backgroundColor: 'white', borderColor: 'red', borderWidth: '1vw',borderRadius: '.8vw' }}>
						
                        <div>{this.props.curHotel.properties.name}</div>
						<div>{this.props.curHotel.properties.location.address1}</div>
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