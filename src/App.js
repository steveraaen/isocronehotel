import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Map from './components/View.js';
import SelectParams from './components/SelectParams.js';
import HotelList from './components/HotelList.js';
import Details from './components/Details.js';
import keys from './keys.js'
import choices from './selections.js'

var w = window.innerWidth;
var h = window.innerHeight;
var isoList =[]
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
		this.getIsosForList = this.getIsosForList.bind(this)

	}
	getMapAndIso(cty, loc) {
		this.setState({
			city: cty,
			location: loc
		}, () => {
			this.getSelectedChain(this.state.city, this.state.chain)
		})
		}
	getIsosForList(lo, la, nm) {

		var urlb = 'https://api.mapbox.com/isochrone/v1/mapbox/walking/' + lo + ',' + la + '?contours_minutes=2,5,10&contours_colors=6706ce,04e813,4286f4&polygons=true&access_token=' + keys.mbk
			axios.get(urlb)
			  .then( (resp) =>{		
			  
			  	this.setState({
			  		isoList: resp.data.features,
			  		location: [lo, la],
			  		curHotel: nm
			  	})
		})
			  .catch(function (error) {
			    console.log(error);
	});

}
	getSelectedChain(ct,ch) {
		this.setState({
			chain: ch
		}, () => {
		axios.get('/hotels',{ params: {city: ct, chain: ch}
    	})
		.then(val => {
		
			this.setState({
				hotels: val.data
			}, () => {
			
			for(let i = 0; i < this.state.hotels.length; i++) {
			
			this.getIsosForList(this.state.hotels[i].coordinates.longitude, this.state.hotels[i].coordinates.latitude)
			
		}
			})
		})	
	})
}

	componentDidMount() {
		this.getMapAndIso(this.state.city, this.state.location)
		this.getSelectedChain(this.state.city, this.state.chain)
	}

  render() {


    return (
      <div>
        <Map appState={this.state} hotels={this.state.hotels} isoMarkers={this.state.isoMarkers} updateLocation={this.updateLocation} isoList={this.state.isoList}/>
        	<div className="aside">
        		<SelectParams appState={this.state} getMapAndIso={this.getMapAndIso}  getSelectedChain={this.getSelectedChain}/>
      	</div>
        	<div className="asidec">
        		<HotelList city={this.state.city} chain={this.state.chain} hotels={this.state.hotels} getIsosForList={this.getIsosForList}/>
      	</div>
        	<div className="asider">
        		<Details curHotel={this.state.curHotel}/>
      	</div>
      </div>
    );
  }
}

export default App;
