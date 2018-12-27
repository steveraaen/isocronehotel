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
    		location: choices.cities[0].location,
    		choices: choices,
    		zoom: 14,
    		ratingColors: ["#FFDA70","#FF9878","#FF80A3","#FF89E5","#DE91FF","#AD99FF","#A2BFFF","#AAF0FF","#B3FFE4"]
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
			this.getSelectedChain(this.state.city)
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
		var urlb = 'https://api.mapbox.com/isochrone/v1/mapbox/walking/' + lo + ',' + la + '?contours_minutes=5,10,15&contours_colors=041d9a,04e813,4286f4&polygons=true&access_token=' + keys.mbk
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
	getSelectedChain(ct) {

		axios.get('/hotels',{ params: {city: ct}
    	})
		.then(val => {	

			var hotObs = []
			var geoObj= {
				type: 'FeatureCollection',
				features: hotObs
			}
			const colors = this.state.ratingColors
			var ratingCol=[]
			for(let i=0; i < val.data.length; i++) {
				console.log(typeof(val.data[i].rating))
					switch(val.data[i].rating) {
						  case 1:  
						    ratingCol[i] = colors[0]
						    break;
						  case 1.5:  
						    ratingCol[i] = colors[1]
						    break;
						  case 2:  
						    ratingCol[i] = colors[2]
						    break;
    						case 2.5:  
						    ratingCol[i] = colors[3]
						    break;
    						case 3:  
						    ratingCol[i] = colors[4]
						    break;
    						case 3.5:  
						    ratingCol[i] = colors[5]
						    break;
    						case 4:  
						    ratingCol[i] = colors[6]
						    break;
    						case 4.5:  
						    ratingCol[i] = colors[7]
						    break;
    						case 5:  
						    ratingCol[i] = colors[8]	
						    break;					    
						  	default:
						  	ratingCol[i] = "cyan"
						}
					

				hotObs.push({
				type: "Feature",
				geometry: {type: "Point", coordinates: [val.data[i].coordinates.longitude, val.data[i].coordinates.latitude]},	
				properties: {
					ratingCol: ratingCol[i],
				 	display_phone: val.data[i].display_phone,
				 	image_url: val.data[i].image_url,
				 	location: val.data[i].location,
				 	name: val.data[i].name,
				 	phone: val.data[i].phone,
				 	price:val.data[i].price,
				 	rating:JSON.stringify(val.data[i].rating),
				 	review_count: val.data[i].review_count
				 }
				}
				)

			}
			this.setState({
				geoObj: geoObj,
				hotelsGeoJSON: hotObs,
				hotels: val.data,
				zoom: 14
			}, () => {			
				if(this.state.hotels) {
				this.getIso(this.state.hotels[0].coordinates.longitude, this.state.hotels[0].coordinates.latitude)		
				}
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
		this.getSelectedChain(this.state.city)
	}
  render() {
    return (
      <div>
        <Map ratingColors={this.state.ratingColors} hover={this.hover} dtls={this.state.details} isoList={this.state.isoList} appState={this.state} hotels={this.state.hotels} hotelsGeoJSON={this.state.hotelsGeoJSON}isoMarkers={this.state.isoMarkers} updateLocation={this.updateLocation} />
        <div className="input">
      
        		<Input getMapAndIso={this.getMapAndIso}/>

        	<div className="asideCities">
        		<HotelList ratingColors={this.state.ratingColors} hotelsGeoJSON={this.state.hotelsGeoJSON} activeColor={this.state.activeColor} hoverHotel={this.state.hoverHotel} zoom={this.zoom} city={this.state.city} chain={this.state.chain} hotels={this.state.hotels} getIso={this.getIso} getRestaurants={this.getRestaurants}/>
      	</div>
        	<div className="bannerTop">
        		<HotelInfo ratingColors={this.state.ratingColors} hotelsGeoJSON={this.state.hotelsGeoJSON} hoverHotel={this.state.hoverHotel}/>
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
