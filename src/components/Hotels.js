import React, { Component } from 'react';
import axios from 'axios'

export default class Hotels extends Component {
	constructor(props) {
		super(props)
		this.state = {
			city: "Paris"
		}
	}

	componentDidMount() {
		axios.get('/hotels')
		.then(val => {
			console.log(val.data)
			this.setState({
				hotels: val
			})
		})
			}

	render() {
		return (
			<div></div>

			)
	}
}