import React, { Component } from 'react';
import Collapsible from 'react-collapsible';

export default class DistanceKey extends Component {

	handleClick() {
		this.props.toggleKey()
	}
	render() {
		
		if(this.props.showKey) {
			return(
			<div style={{width: "22vw", backgroundColor: "#121B59", textAlign: 'center', fontSize: '20pt', fontWeight: 'bold',color: "yellow", padding: "15px", borderWidth: "5px", borderColor: "white", borderRadius: "8px"}}>

				<Collapsible trigger="Walking Range" triggerStyle={{width: "24vw", backgroundColor: "#121B59", textAlign: 'center', fontSize: '20pt', fontWeight: 'bold',color: "yellow", padding: "15px", borderWidth: "5px", borderColor: "white", borderRadius: "8px"}}>				
					<div style={{textAlign: 'center', fontSize: '24pt', fontWeight: 'bold', color: "black",  marginTop: ".8vh", backgroundColor: "white", opacity: .6,marginBottom: ".33vh"}}>5 minutes</div>
					<div style={{textAlign: 'center', fontSize: '24pt', fontWeight: 'bold', color: "black", backgroundColor: "white", opacity: .48 ,marginBottom: ".33vh"}}>10 minutes</div>
					<div style={{textAlign: 'center', fontSize: '24pt', fontWeight: 'bold', color: "black", backgroundColor: "white", opacity: .3 ,marginBottom: ".33vh"}}>15 minutes</div>
				</Collapsible>
		</div>
				)
		} else {
			return null
		}
	}
}

























