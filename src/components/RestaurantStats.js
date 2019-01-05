import React, { Component } from 'react';
import './CompStyles.css';

export default class RestaurantStats extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        if (this.props.pxScore && this.props.rtngScore && this.props.rvwsScore) {
            return (
                <div className="statBox">
						<div style={{fontSize: "24pt", fontWeight: "bold", textAlign: 'center'}}>Restaurant Summary</div>
						<div style={{display: 'flex', flexDirection: "row", alignItems: 'flex-start'}}>
								<div style={{width: "14vw", fontSize: 24, fontWeight: 'bold', textAlign: 'left'}}>
									Avg Price(1-3)
								</div>
								<div style={{width: 10 * this.props.pxScore , backgroundColor: 'coral', fontSize: 24, fontWeight: 'bold', color: 'black'}}>
									{parseFloat(this.props.pxScore)}
								</div>
						</div>
						
						<div style={{display: 'flex', flexDirection: "row"}}>
								<div style={{width: "14vw", fontSize: 24, fontWeight: 'bold', textAlign: 'left'}}>
									Avg Rating
								</div>
								<div style={{width:  4 * this.props.rtngScore +"vw", backgroundColor: 'cyan',  fontSize: 24, fontWeight: 'bold', color: 'black'}}>
									{parseFloat(this.props.rtngScore)}
								</div>
						</div>						
						<div style={{display: 'flex', flexDirection: "row"}}>
								<div style={{width: "14vw", fontSize: 24, fontWeight: 'bold', textAlign: 'left'}}>
									Popularity
								</div>
								<div style={{width: .3 * this.props.rvwsScore + "vw",  backgroundColor: 'pink', fontSize: 24, fontWeight: 'bold', color: 'black'}}>
									{parseFloat(this.props.rvwsScore)}
								</div>
						</div>
				</div>
            )
        } else { return null }
    }
}