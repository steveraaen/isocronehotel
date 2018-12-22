import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import './CompStyles.css';

export default class SelectChain extends Component {
	constructor(props) {
		super(props)
		this.state = {
		}
		this.handleChainClick = this.handleChainClick.bind(this)
}
	handleChainClick(ct, ch) {
		this.props.getSelectedChain(ct, ch)
}
	render() {
		const chainList = this.props.appState.choices.chains.map((chn, idx) => {
			return (<button className="buttonText" key={idx}onClick={() => this.handleChainClick(this.props.appState.city, chn)}>{chn}</button>)
	})
		return (
			<div>
				<Collapsible triggerStyle={{color: "black", textAlign: 'left', marginLeft: '1vw',fontSize: "22pt", fontWeight: 'bold'}} trigger="Hotel Brands" open={false}>						
					<div style={{display: 'flex', flexDirection: 'column'}} >{chainList}</div>
				
				</Collapsible>
			</div>
		
			)
		}
}