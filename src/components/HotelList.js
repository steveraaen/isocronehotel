import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import './CompStyles.css';
export default class HotelList extends Component {
	constructor(props) {
		super(props)
		this.handleHotelClick = this.handleHotelClick.bind(this)
	}
	handleHotelClick(lo, la, nm) {
		this.props.getIsosForList(lo, la, nm)
		console.log(nm)
	}
	render() {
		if(this.props.hotels) {
		var hotels = this.props.hotels.map((nm, idx) => {
			return(<button style={{ fontSize: "22pt", overflow: 'ellipsis'}} key={idx} onClick={() => this.handleHotelClick(nm.coordinates.longitude, nm.coordinates.latitude, nm)}>{nm.name}</button>)
		})
	} else { 
		var hotels = (<div>Nothing to show</div>) 
		return  hotels 
	}
		return (		
      <Collapsible triggerStyle={{color: "black", alignItems: 'center', fontSize: "22pt", fontWeight: 'bold'}} trigger={this.props.chain +"s in " + this.props.city  } open={true}>
      <div style={{padding: '1vh', display: 'flex', flexDirection: 'column'}}>
  			{hotels}
  		</div>
     </Collapsible>		
			)
	}
}