import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

export default class DistanceKey extends Component {

	handleClick() {
		this.props.toggleKey()
	}
	render() {
		
		if(this.props.showKey) {
			return(
<Panel style={{backgroundColor: "black"}}>
				<div style={{flexDirection: 'column', alignItems: 'flex-end', backgroundColor: 'black', borderWidth: "1px", borderRadius: "8px", borderColor: "white"}}>
					<div style={{ flexDirection: "row", justifyContent: 'space-between'}}>
						<div style={{marginLeft: "1.6vw", fontSize: '20pt', fontWeight: 'bold',color: "white"}} onClick={() => this.handleClick()}>X</div>
						<div style={{textAlign: 'center', fontSize: '20pt', fontWeight: 'bold',color: "white", paddingBottom: "1vh"}}>Walking Range</div>
					</div>	
					<div style={{textAlign: 'center', fontSize: '20pt', fontWeight: 'bold', color: "white", backgroundColor: "rgba(255,255,255,.6)", marginBottom: ".3vh"}}>5 minutes</div>
					<div style={{textAlign: 'center', fontSize: '20pt', fontWeight: 'bold', color: "white", backgroundColor: "rgba(255,255,255,.48)", marginBottom: ".3vh"}}>10 minutes</div>
					<div style={{textAlign: 'center', fontSize: '20pt', fontWeight: 'bold', color: "white", backgroundColor: "rgba(255,255,255,.36)", marginBottom: ".3vh"}}>15 minutes</div>
				</div>
				</Panel>
				)
		} else {
			return null
		}
	}
}

























