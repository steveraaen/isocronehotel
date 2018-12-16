import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Map from './components/View.js';
import Cities from './components/Cities.js';
import Chains from './components/Chains.js';
import keys from './keys.js'
var w = window.innerWidth;
var h = window.innerHeight;

class App extends Component {
	constructor(props) {
		super(props)
		this.state={
			w: w,
			h: h,
    		city: "Madrid",
    		location: [-3.673830,40.419410]
		}
		this.getSelectedCity = this.getSelectedCity.bind(this)
		this.getSelectedChain = this.getSelectedChain.bind(this)
	}
	getSelectedCity(cty, loc) {
		this.setState({
			selectedCity: cty,
			location: loc
		}, () => {
			var url = 'https://api.mapbox.com/isochrone/v1/mapbox/walking/' + this.state.location[0] + ',' + this.state.location[1] + '?contours_minutes=5,10,15&contours_colors=6706ce,04e813,4286f4&polygons=true&access_token=' + keys.mbk
			axios.get(url)
			  .then( (response) =>{
				this.setState({
					isochrone: response.data.features
				})
			})
			  .catch(function (error) {
			    console.log(error);
			  });
			})
		}
	getSelectedChain(c) {
		this.setState({
			chain: c
		})
	}
	componentDidMount() {
		this.getSelectedCity(this.state.city, this.state.location)
		axios.get('/hotels')
		.then(val => {
			console.log(val.data)
			this.setState({
				hotels: val
			})
		})
	}

  render() {
	console.log(this.state)

    return (
      <div>
        <Map appState={this.state} iso={this.state.isochrone} updateLocation={this.updateLocation}/>
        	<div className="aside">
        		<Cities appState={this.state} getSelectedCity={this.getSelectedCity}/>
      	</div>
        	<div className="asider">
        		<Chains hotelList={this.state.hotels} getSelectedChain={this.getSelectedChain}/>
      	</div>
      </div>
    );
  }
}

export default App;
