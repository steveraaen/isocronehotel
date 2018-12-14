import React, { Component } from 'react';
import axios from 'axios'
import keys from '../env.js'

export default class Hotels extends Component {
	constructor(props) {
		super(props)
		this.state = {
			city: "Paris"
		}
	}
	componentDidMount() {
		var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=harbour&key=" + keys.gk
		console.log(url)
		axios.get(url)
		.then((respo) =>{
			console.log(respo)
		
		})		  
		.catch(function (error) {
		    console.log(error);
		  });
	}

	render() {
		return (
			<div></div>

			)
	}
}