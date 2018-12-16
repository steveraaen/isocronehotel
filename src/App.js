import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Map from './components/View.js';
import SelectParams from './components/SelectParams.js';
import HotelList from './components/HotelList.js';
import keys from './keys.js'
import choices from './selections.js'

var w = window.innerWidth;
var h = window.innerHeight;

class App extends Component {
	constructor(props) {
		super(props)
		this.state={
			w: w,
			h: h,
			city: choices.cities[0].name,
			chain: choices.chains[0],
    		location: choices.cities[0].location,
    		choices: choices
		}
		this.getMapAndIso = this.getMapAndIso.bind(this)
		this.getSelectedChain = this.getSelectedChain.bind(this)

	}
	getMapAndIso(cty, loc) {
		this.setState({
			city: cty,
			location: loc
		}, () => {
			var url = 'https://api.mapbox.com/isochrone/v1/mapbox/walking/' + this.state.location[0] + ',' + this.state.location[1] + '?contours_minutes=5,10,15&contours_colors=6706ce,04e813,4286f4&polygons=true&access_token=' + keys.mbk
			axios.get(url)
			  .then( (response) =>{
				this.setState({
					isochrone: response.data.features
				}, this.getSelectedChain(this.state.city, this.state.chain))
			})
			  .catch(function (error) {
			    console.log(error);
			  });
			})
		}
	getSelectedChain(ct,ch) {
		this.setState({
			chain: ch
		}, () => {
		axios.get('/hotels',{ params: {city: ct, chain: ch}
    })
		.then(val => {
			console.log(val.data)
			this.setState({
				hotels: val
			})
		})	
		})
	}



	componentDidMount() {
		this.getMapAndIso(this.state.city, this.state.location)
		this.getSelectedChain(this.state.city, this.state.chain)

	}

  render() {
	console.log(this.state)

    return (
      <div>
        <Map appState={this.state} iso={this.state.isochrone} updateLocation={this.updateLocation}/>
        	<div className="aside">
        		<SelectParams appState={this.state} getMapAndIso={this.getMapAndIso}  getSelectedChain={this.getSelectedChain}/>
      	</div>
        	<div className="asider">
        		<HotelList hotels={this.state.hotels}/>
      	</div>
      </div>
    );
  }
}

export default App;
