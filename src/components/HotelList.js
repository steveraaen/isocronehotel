import React, { Component } from 'react';
import Collapsible from 'react-collapsible';


export default class HotelList extends Component {
	constructor(props) {
		super(props)
		this.handleHotelClick = this.handleHotelClick.bind(this)
	}
	handleHotelClick(lo, la) {
		this.props.getIsosForList(lo, la)
		console.log(lo)
	}

	render() {

		if(this.props.hotels) {
		var hotels = this.props.hotels.map((nm, idx) => {
			return(<button key={idx} onClick={() => this.handleHotelClick(nm.coordinates.longitude, nm.coordinates.latitude)}>{nm.name}</button>)
		})
	} else { 
		var hotels = (<div>Nothing to show</div>) 
		return  hotels 
	}
		return (
		
      <Collapsible trigger="Start here" open="true">
      <div style={{display: 'flex', flexDirection: 'column'}}>
  			{hotels}
  		</div>
     </Collapsible>
		
			)
	}
}