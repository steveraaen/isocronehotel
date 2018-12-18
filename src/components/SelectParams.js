import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import './CompStyles.css';


export default class SelectParams extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}
		this.handleClick = this.handleClick.bind(this)
		this.handleChainClick = this.handleChainClick.bind(this)
	}
	handleClick(c, l) {		
		this.props.getMapAndIso(c, l)
	}		
	
	handleChainClick(ct, ch) {
			this.props.getSelectedChain(ct, ch)

	}

	render() {
		
		const cityList = this.props.appState.choices.cities.map((cty, idx) => {
			return (<button key={idx} onClick={() => this.handleClick(cty.nameCtry, cty.location)}>{cty.name}</button>)
		})
		const chainList = this.props.appState.choices.chains.map((chn, idx) => {
			return (<button key={idx}onClick={() => this.handleChainClick(this.props.appState.city, chn)}>{chn}</button>)
		})
		return (
			<div>
			<Collapsible trigger="Cities" open={true}>
					<div style={{display: 'flex', flexDirection: 'column', color: 'black'}} >{cityList}</div>
		
						<div style={{height: "4vh"}}> </div>
				<Collapsible trigger="Hotel Brands" open={false}>						
					<div style={{display: 'flex', flexDirection: 'column'}} >{chainList}</div>
				</Collapsible>
				</Collapsible>
			</div>
		
			)
	}
}