import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import './CompStyles.css';

export default class HotelList extends Component {
	
	constructor(props) {
		super(props)
		this.state={
			activeColor: 'white'
		}
		
		this.handleHotelClick = this.handleHotelClick.bind(this)
	}

	handleHotelClick(lo, la, nm) {
		this.props.getIso(lo, la, nm)
		this.props.getRestaurants(lo, la)
		this.props.zoom()
		console.log(nm)
	}

	render() {
		
		if(this.props.hotelsGeoJSON) {
		var hotels = this.props.hotelsGeoJSON.map((nm, idx) => {

			return(<button style={{ backgroundColor: nm.properties.ratingCol, fontSize: "16pt", overflow: 'ellipsis'}} key={idx} onClick={() => this.handleHotelClick(nm.geometry.coordinates[0], nm.geometry.coordinates[1], nm)}>{nm.properties.name}</button>)
		})
	} else { 
		 hotels = (<div>Nothing to show</div>) 
		return  hotels 
	}
		return (		
      <Collapsible triggerStyle={{color: "yellow", backgroundColor: 'black', alignItems: 'center', fontSize: "20pt", fontWeight: 'bold'}} trigger={"Hotels in " + this.props.city  } >
      <div style={{padding: '1vh', display: 'flex', flexDirection: 'column'}}>
  			{hotels}
  		</div>
     </Collapsible>		
			)
	}
}


























