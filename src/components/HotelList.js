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
		this.matchButton = this.matchButton.bind(this)

	}
		matchButton(b) {	
		if(this.state.hoverHotel && this.state.hotels) {
			console.log(b.properties.name)
			for(let i = 0; i < this.state.hotels.length; i++) {
				console.log(this.state.hotels[i].name)
				if(this.state.hotels[i].name === b.properties.name)  {
					this.setState({activeColor: 'blue'})
					}
				}
			}
		}
	handleHotelClick(lo, la, nm) {
		this.props.getIso(lo, la, nm)
		this.props.getRestaurants(lo, la)
		this.props.zoom()
		console.log(nm)
	}

	render() {
		
		if(this.props.hotelsGeoJSON && this.props.hoverHotel) {
		var hotels = this.props.hotelsGeoJSON.map((nm, idx) => {

			return(<button style={{ backgroundColor: nm.properties.ratingCol, fontSize: "16pt", overflow: 'ellipsis'}} key={idx} onClick={() => this.handleHotelClick(nm.geometry.coordinates[0], nm.geometry.coordinates[1], nm)}>{nm.properties.name}</button>)
		})
	} else { 
		var hotels = (<div>Nothing to show</div>) 
		return  hotels 
	}
		return (		
      <Collapsible triggerStyle={{color: "black", alignItems: 'center', fontSize: "22pt", fontWeight: 'bold'}} trigger={"Hotels in " + this.props.city  } open={true}>
      <div style={{padding: '1vh', display: 'flex', flexDirection: 'column'}}>
  			{hotels}
  		</div>
     </Collapsible>		
			)
	}
}


























