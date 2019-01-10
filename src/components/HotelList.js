import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import './CompStyles.css';

export default class HotelList extends Component {
	
	constructor(props) {
		super(props)
		this.state={
			activeColor: 'white',
			opacity: 1
		}
		
		this.handleHotelClick = this.handleHotelClick.bind(this)
		this.handleMouseEnter = this.handleMouseEnter.bind(this)
		this.handleMouseLeave = this.handleMouseLeave.bind(this)
	}

	handleHotelClick(lo, la, nm) {
		const { getRestaurants, getIso, getMapAndIso } = this.props		
 		getRestaurants(lo, la)
		setTimeout(function() {
			getMapAndIso( nm, [lo, la])
		}, 2000)	
	}

	handleMouseEnter(n) {
	n.properties.opacity = .8		
	n.properties.color = "yellow"	
		this.props.expandCircle(n)
	}
	handleMouseLeave(n) {
		console.log(n)
	n.properties.opacity = 1
	n.properties.color = "white"			
	
	}

	render() {
		if(this.props.hotelsGeoJSON) {
		var hotels = this.props.hotelsGeoJSON.map((nm, idx) => {
			var initColor = nm.properties.ratingCol
			return(<button style={{ opacity: nm.properties.opacity, color: nm.properties.color, backgroundColor: initColor, fontSize: "1vw", overflow: 'ellipsis'}} key={idx} onMouseEnter={() => this.handleMouseEnter(nm)} onMouseLeave={() => this.handleMouseLeave(nm)} onClick={() => this.handleHotelClick(nm.geometry.coordinates[0], nm.geometry.coordinates[1], nm)}>{nm.properties.name}</button>)
		})
	} else { 
		 hotels = (<div>Nothing to show</div>) 
		return  hotels 
	}
		return (	
<div style={{width: "22vw", backgroundColor: "#121B59", textAlign: 'center', fontSize: '2vw', fontWeight: 'bold',color: "yellow", padding: "15px", borderWidth: "5px", borderRadius: "8px"}}>
      <Collapsible trigger={"Hotels in " + this.props.city  }   >
      <div style={{padding: '1vh', display: 'flex', flexDirection: 'column'}}>
  			{hotels}
  		</div>
     </Collapsible>	
     </div>	
			)
	}
}


























