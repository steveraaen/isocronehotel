import React, { Component } from 'react';



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
				<div style={{color: 'black'}}>
					<ul style={{listStyleType: "none", color: 'black'}} >{cityList}</ul>
				</div>
							<div style={{color: 'black'}}>
					<ul style={{listStyleType: "none"}} >{chainList}</ul>
				</div>
			</div>
		
			)
	}
}