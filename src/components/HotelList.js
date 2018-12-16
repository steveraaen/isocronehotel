import React, { Component } from 'react';



export default class HotelList extends Component {
	constructor(props) {
		super(props)
		this.handleHotelClick = this.handleHotelClick.bind(this)
	}
	handleHotelClick(ch) {
		console.log('clicked')
	}

	render() {
		console.log(this.props.hotels)
		if(this.props.hotels) {
		var hotels = this.props.hotels.data.map((nm, idx) => {
			return(<button key={idx} onClick={() => this.handleHotelClick()}>{nm.name}</button>)
		})
	} else { 
		var hotels = (<div>Nothing to show</div>) 
		return  hotels 
	}
		return (
		
				<div style={{color: 'black'}}>
					<ul style={{listStyleType: "none", color: 'black'}} >{hotels}</ul>
				</div>
		
			)
	}
}