import React, { Component } from 'react';
import Collapsible from 'react-collapsible';

export default class DistanceKey extends Component {

	handleClick() {
		this.props.toggleKey()
	}
	render() {
		
		if(this.props.showKey) {
			return(
			<div style={{width: "22vw", backgroundColor: "#121B59", textAlign: 'center', fontSize: '2vw', fontWeight: 'bold',color: "yellow", padding: "1vw", borderWidth: ".1vw", borderColor: "white", borderRadius: "1vw"}}>

				<Collapsible trigger="Walking Range" triggerStyle={{width: "24vw", backgroundColor: "#121B59", textAlign: 'center', fontSize: '2vw', fontWeight: 'bold',color: "yellow", padding: "1vw", borderWidth: ".1vw", borderColor: "white", borderRadius: "1vw"}}>				
					<div style={{textAlign: 'center', fontSize: '2vw', fontWeight: 'bold', color: "black",  marginTop: ".8vh", backgroundColor: "white", opacity: .6,marginBottom: ".33vh"}}>5 minutes</div>
					<div style={{textAlign: 'center', fontSize: '2vw', fontWeight: 'bold', color: "black", backgroundColor: "white", opacity: .48 ,marginBottom: ".33vh"}}>10 minutes</div>
					<div style={{textAlign: 'center', fontSize: '2vw', fontWeight: 'bold', color: "black", backgroundColor: "white", opacity: .3 ,marginBottom: ".33vh"}}>15 minutes</div>
				</Collapsible>
		</div>
				)
		} else {
			return null
		}
	}
}

























