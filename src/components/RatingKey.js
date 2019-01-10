import React, { Component } from 'react';
import Collapsible from 'react-collapsible';

export default class RatingKey extends Component {

	handleClick() {
		this.props.toggleKey()
	}
	render() {
		
	
			return(
			<div style={{marginTop:"1vh", width: "22vw", backgroundColor: "#121B59", textAlign: 'center', fontSize: '2vw', fontWeight: 'bold',color: "yellow", padding: "15px", borderWidth: "5px", borderColor: "white", borderRadius: "8px"}}>
				<Collapsible trigger="Ratings Key" triggerStyle={{width: ".24vw", backgroundColor: "#121B59", textAlign: 'center', fontSize: '2vw', fontWeight: 'bold',color: "yellow", padding: "15px", borderWidth: "5px", borderColor: "white", borderRadius: "8px"}}>				
					<div style={{flex: 1, flexDirection: 'column'}}>
						<div style={{backgroundColor: this.props.ratingColors[8], flex: .1, color: "white"}}>5</div>
						<div style={{backgroundColor: this.props.ratingColors[7], flex: .1, color: "white"}}>4.5</div>
						<div style={{backgroundColor: this.props.ratingColors[6], flex: .1, color: "white"}}>4</div>
						<div style={{backgroundColor: this.props.ratingColors[5], flex: .1, color: "white"}}>3.5</div>
						<div style={{backgroundColor: this.props.ratingColors[4], flex: .1, color: "white"}}>3</div>
						<div style={{backgroundColor: this.props.ratingColors[3], flex: .1, color: "white"}}>2.5</div>
						<div style={{backgroundColor: this.props.ratingColors[2], flex: .1, color: "white"}}>2</div>
						<div style={{backgroundColor: this.props.ratingColors[1], flex: .1, color: "white"}}>1.5</div>
						<div style={{backgroundColor: this.props.ratingColors[0], flex: .1, color: "white"}}>1</div>
					</div>
					</Collapsible>
		</div>
				)
		
	}
}
