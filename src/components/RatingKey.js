import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import './CompStyles.css';

export default class RatingKey extends Component {

	handleClick() {
		this.props.toggleKey()
	}
	render() {
		
		if(this.props.showKey) {
			return(
			<div style={{width: "22vw", backgroundColor: "#0D2B9F", textAlign: 'center', fontSize: '20pt', fontWeight: 'bold',color: "yellow", padding: "15px", borderWidth: "5px", borderColor: "white", borderRadius: "8px"}}>

				<Collapsible trigger="Walking Range" triggerStyle={{width: ".24vw", backgroundColor: "#0D2B9F", textAlign: 'center', fontSize: '20pt', fontWeight: 'bold',color: "yellow", padding: "15px", borderWidth: "5px", borderColor: "white", borderRadius: "8px"}}>				
<div className="ratingKey">.</div>
					</Collapsible>
		</div>
				)
		} else {
			return null
		}
	}
}
