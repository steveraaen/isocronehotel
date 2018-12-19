import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import './CompStyles.css';

export default class SelectCities extends Component {
	constructor(props) {
		super(props)
		this.state = {
		}
		this.handleClick = this.handleClick.bind(this)
		
	}
	handleClick(c, l) {		
		this.props.getMapAndIso(c, l)
	}		
	
	render() {
		
		const cityList = this.props.appState.choices.cities.map((cty, idx) => {
			return (<button className="buttonText" key={idx} onClick={() => this.handleClick(cty.nameCtry, cty.location)}>{cty.name}</button>)
		})

		return (
			<div>
			<Collapsible triggerStyle={{color: "black", textAlign: 'center', fontSize: "22pt", fontWeight: 'bold'}} trigger="Cities" open={true}>
					<div style={{display: 'flex', flexDirection: 'column', color: 'black'}} >{cityList}</div>
		</Collapsible>
			</div>
		
			)
	}
}