import React, { Component } from 'react';
import choices from '../selections.js'


export default class Chain extends Component {
	constructor(props) {
		super(props)
		this.state = {
			chains: choices.chains
		}
		this.handleChainClick = this.handleChainClick.bind(this)
	}
	handleChainClick(ch) {
		this.props.getSelectedChain(ch, () => {
			this.props.getAll(this.props.city, this.props.chain)
		})
	}

	render() {
		const chainList = this.state.chains.map((chn, idx) => {
			return (<a key={idx} href="#" onClick={() => this.handleChainClick(chn)}> <li>{chn}</li></a>)
		})
		return (
		
				<div style={{color: 'black'}}>
					<ul style={{listStyleType: "none"}} >{chainList}</ul>
				</div>
		
			)
	}
}