import React, { Component } from 'react';
import axios from 'axios'
import { Navbar } from 'react-bootstrap';
import './App.css';
import Map from './components/View.js';
import Input from './components/Input.js';
import HotelList from './components/HotelList.js';
import HotelInfo from './components/HotelInfo.js';
import Details from './components/Details.js';
import keys from './keys.js'
import choices from './selections.js'
import europe from './europe.js'
import countries from './countries.js'
var w = window.innerWidth;
var h = window.innerHeight;
var isoList =[]
class App extends Component {
	constructor(props) {
		super(props)
		this.state={
			w: w,
			h: h,
			allCities: europe,
			city: choices.cities[0].name,
			chain: choices.chains[0],
    		location: choices.cities[0].location,
    		choices: choices,
    		zoom: 13
		}
		this.getMapAndIso = this.getMapAndIso.bind(this)
		this.getSelectedChain = this.getSelectedChain.bind(this)
		this.getIso = this.getIso.bind(this)
		this.zoom = this.zoom.bind(this)
		this.getRestaurants = this.getRestaurants.bind(this)
		 this.hover = this.hover.bind(this)
	}

	zoom() {
		this.setState({zoom: 16})
	}
	getMapAndIso(cty, loc) {
		this.setState({
			city: cty,
			location: loc
		}, () => {
			this.getSelectedChain(this.state.city, this.state.chain)
		})
		}
	getRestaurants(lo, la) {
		console.log(lo, la)
		axios.get('/details',{ params: {longitude: lo, latitude: la}})
				.then( (res) => {
					this.setState({details: res})
				})	
	}
	getIso(lo, la, nm) {
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
console.log(val)
			var hotObs = []
			var geoObj= {
				type: 'FeatureCollection',
				features: hotObs
			}
			const colors = ['green', 'red', 'yellow', 'purple', 'orange', 'white', 'black', 'pink', 'brown', 'coral', 'lightBlue']

			for(let i=0; i < val.data.length; i++) {
				/*for(let j=0; j < val.data.length; j++) {}*/

				hotObs.push({
				type: "Feature",
				geometry: {type: "Point", coordinates: [val.data[i].coordinates.longitude, val.data[i].coordinates.latitude]},	
				properties: {
					"color": colors[i],
				 	display_phone: val.data[i].display_phone,
				 	image_url: val.data[i].image_url,
				 	location: val.data[i].location,
				 	name: val.data[i].name,
				 	phone: val.data[i].phone,
				 	price:val.data[i].price,
				 	rating:val.data[i].rating,
				 	review_count: val.data[i].review_count
				 }
				}
				)

			}


			this.setState({
				geoObj: geoObj,
				hotelsGeoJSON: hotObs,
				hotels: val.data,
				zoom: 13
			}, () => {			
				if(this.state.hotels) {
				this.getIso(this.state.hotels[0].coordinates.longitude, this.state.hotels[0].coordinates.latitude)		
				}
			})
		})	
	})
}
hover(b) {
  this.setState({
    hoverHotel: b
  })  
}
	componentDidMount() {
		this.getMapAndIso(this.state.city, this.state.location)
		this.getSelectedChain(this.state.city, this.state.chain)
	}
  render() {
    return (
      <div>
        <Map hover={this.hover} dtls={this.state.details} isoList={this.state.isoList} appState={this.state} hotels={this.state.hotels} hotelsGeoJSON={this.state.hotelsGeoJSON}isoMarkers={this.state.isoMarkers} updateLocation={this.updateLocation} />
        <div style={{top: '5vh', position: 'absolute'}}>
      
        		<Input getMapAndIso={this.getMapAndIso}/>

        	<div className="asideCities">
        		<HotelList zoom={this.zoom} city={this.state.city} chain={this.state.chain} hotels={this.state.hotels} getIso={this.getIso} getRestaurants={this.getRestaurants}/>
      	</div>
        	<div className="bannerTop">
        		<HotelInfo {...this.state} hoverHotel={this.state.hoverHotel}/>
      	</div>
      	</div>
        	<div className="asider">
        		<Details dtls={this.state.details} curHotel={this.state.curHotel}/>
      	</div>
      </div>
    );
  }
}
export default App;
