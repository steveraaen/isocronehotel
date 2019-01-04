import React, { Component } from 'react';

import './CompStyles.css';

export default class RestaurantStats extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		if(this.props.pxScore && this.props.rtngScore && this.props.rvwsScore) {
		return(
				<div style={{width: "24vw"}}>

						<div style={{width: "22vw"}}>Price(1-3)
							<div style={{width: 7.33 * this.props.pxScore +"vw", backgroundColor: 'coral', fontSize: 18, color: 'black'}}>{parseFloat(this.props.pxScore)}</div>
						</div>

						<div style={{width: "22vw"}}>
							<div style={{width: 4.4 * this.props.rtngScore +"vw", backgroundColor: 'cyan',  fontSize: 18, color: 'black'}}>{parseFloat(this.props.rtngScore)}</div>
						</div>
						
						<div style={{width: "22vw"}}>
							<div style={{width: .22 * this.props.rvwsScore + "vw", maxWidth: "22vw", backgroundColor: 'pink', fontSize: 18, color: 'black'}}>{parseFloat(this.props.rvwsScore)}</div>
						</div>

				</div>
			)} else {return null}
	}
}