import React, { Component,  Suspense, lazy } from 'react';
import axios from 'axios'
import './App.css';
import Map from './components/View.js';
import Input from './components/Input.js';
import HotelList from './components/HotelList.js';
import Details from './components/Details.js';
import RestaurantTable from './components/RestaurantTable.js';
import RestaurantStats from './components/RestaurantStats.js';
import DistanceKey from './components/DistanceKey.js';
import RatingKey from './components/RatingKey.js';
import keys from './keys.js'
import choices from './selections.js'
import europe from './europe.js'
var w = window.innerWidth;
var h = window.innerHeight;
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
    		ratingColors: ["#2C8208","#098926","#0A906E","#0B7298","#0D2B9F","#3E0EA6","#9310AE","#B5127B","#BD1428"].reverse(),
    		/*ratingColors: ["#2C8208","#098926","#0A906E","#0B7298","#0D2B9F","#3E0EA6","#9310AE","#B5127B","#BD1428"],*/
    	/*	ratingColors: ["#FFDA70","#FF9878","#FF80A3","#FF89E5","#DE91FF","#AD99FF","#A2BFFF","#AAF0FF","#B3FFE4"],*/
/*    		ratingColors: ["#1DBD00","#54C507","#8ACD0","#C1D518","#DEC321","#E69E2B","#EE7936","#F65741","#FF4D63"],
*/    		showKey: true,
    		dotMode: "hotel",
    		circleRadius: 10
  /*  		ratingColors: ["rgba(77,210,255,.8)", "rgba(81,254,250,.8)", "rgba(86,254,204,.8)", "rgba(90,254,160,.8)", "rgba(95,254,119,.8)", "rgba(119,254,100,.8)", "rgba(165,254,104,.8)", "rgba(207,254, 09,.8)", "rgba(248,254,114,.8)"]*/	
		}
		this.getMapAndIso = this.getMapAndIso.bind(this)
		this.getSelectedChain = this.getSelectedChain.bind(this)
		this.getIso = this.getIso.bind(this)
		this.zoom = this.zoom.bind(this)
		this.getRestaurants = this.getRestaurants.bind(this)
		 this.hover = this.hover.bind(this)
		 this.hoverOut = this.hoverOut.bind(this)
		 this.toggleKey = this.toggleKey.bind(this)
		 this.expandCircle = this.expandCircle.bind(this)
		 this.expandRestCircle = this.expandRestCircle.bind(this)

	}
	zoom() {
		this.setState({zoom: 16})
	}
	getMapAndIso(cty, loc) {
		console.log('getMapAndIso called')
		this.setState({
			city: cty,
			location: loc
		}, () => {
			this.getSelectedChain(cty)
		})
		}
	getRestaurants(lo, la) {
		console.log('getRestaurants called')
		console.log(lo, la)
		axios.get('/details',{ params: {longitude: lo, latitude: la}})
				.then( (res) => {
			var restObs = []
			var resGeoObj= {
				type: 'FeatureCollection',
				features: restObs
			}
			const colors = this.state.ratingColors
			var ratingCol=[]
			for(let i=0; i < res.data.length; i++) {
			
					switch(res.data[i].rating) {
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
				restObs.push({
				type: "Feature",
				geometry: {type: "Point", coordinates: [res.data[i].coordinates.longitude, res.data[i].coordinates.latitude]},	
				properties: {
					ratingCol: ratingCol[i],
				 	display_phone: res.data[i].display_phone,
				 	distance: res.data[i].distance,
				 	image_url: res.data[i].image_url,
				 	location: res.data[i].location,
				 	name: res.data[i].name,
				 	phone: res.data[i].phone,
				 	price:res.data[i].price,
				 	rating:JSON.stringify(res.data[i].rating),
				 	review_count: res.data[i].review_count,
				 	type: res.data[i].categories[0].title,
				 	opacity: 1,
				 	borderColor: "white",
				 	color: 'white'
				 }
				}
			)
			restObs.sort((a,b) =>  (b.properties.rating > a.properties.rating) ? 1 : ((a.properties.rating > b.properties.rating) ? -1 : 0)); 		

			}
			this.setState({
				resGeoObj: resGeoObj
			}, () => {
		if(this.state.resGeoObj) {
    		var totRtng = 0;
    		var totRvws = 0;
    		var totCvtPx = 0;
    		var arr = this.state.resGeoObj.features
    			for(let i = 0; i < arr.length; i++) {
    				totRtng = totRtng + parseFloat(arr[i].properties.rating)
    				totRvws = totRvws + arr[i].properties.review_count
    				switch(arr[i].properties.price) {
    					case "€":
    					case "£":
    					case "₺":
    					arr[i].properties.cvtPx = 1
    					break;
    					case "€€":
    					case "££":
    					case "₺₺":
    					arr[i].properties.cvtPx = 2
    					break;
    					case "€€€":
    					case "£££":
    					case "₺₺₺":
    					arr[i].properties.cvtPx = 3
    					break;
    					default:
    					arr[i].properties.cvtPx = 0
    				}
    				totCvtPx = totCvtPx + arr[i].properties.cvtPx
    				var maxReviews = Math.max.apply(Math, resGeoObj.features.map(function(o) { return o.properties.review_count; }))
    			   
    			}
  var rtngScore = (totRtng/arr.length).toFixed(2)
  var rvwsScore = (totRvws/arr.length).toFixed(2)
  var pxScore = (totCvtPx/arr.length).toFixed(2)
 	
    	}
    	this.setState({
    		rtngScore: rtngScore,
    		rvwsScore: rvwsScore,
    		pxScore: pxScore,
    		maxReviews: maxReviews

    	})
			})					
					this.setState({details: res})
				})	
	}
	getIso(lo, la, nm) {
		var urlb = 'https://api.mapbox.com/isochrone/v1/mapbox/walking/' + lo + ',' + la + '?contours_minutes=5,15,30&contours_colors=041d9a,04e813,4286f4&polygons=true&access_token=' + keys.mbk
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
				 	review_count: val.data[i].review_count,
				 	cRad: 10,
				 	opacity: 1,
				 	borderColor: "white",
				 	color: 'white'
				 }
				}
			)
			hotObs.sort((a,b) =>  (b.properties.rating > a.properties.rating) ? 1 : ((a.properties.rating > b.properties.rating) ? -1 : 0)); 		
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
hoverOut() {
  this.setState({
    hoverHotel: null
  })  
}
	componentDidMount() {
		this.getMapAndIso(this.state.city, this.state.location, function() {
			this.getSelectedChain(this.state.city)
		})
	}
	toggleKey() {
		this.setState({
			showKey: !this.state.showKey
		})
	}
expandCircle(nm) {
	this.setState({
		curHotel: nm
	})
}
expandRestCircle(rst) {
	this.setState({
		curRest: rst
	})
}
  render() {
  	if(this.state.showKey) {
  		var shadeKey = (<div >
        		<DistanceKey showKey={this.state.showKey} toggleKey={this.toggleKey}/>
      	</div>)
  	} else{ shadeKey = null}
    return (
      <div>
        <Map curHotel={this.state.curHotel} curRest={this.state.curRest} resGeoObj={this.state.resGeoObj} ratingColors={this.state.ratingColors} hover={this.hover} hoverOut={this.hoverOut} dtls={this.state.details} isoList={this.state.isoList} appState={this.state} hotels={this.state.hotels} hotelsGeoJSON={this.state.hotelsGeoJSON}isoMarkers={this.state.isoMarkers} hoverHotel={this.state.hoverHotel} updateLocation={this.updateLocation} />
        <div className="input">     
        		<Input getMapAndIso={this.getMapAndIso} />
        	<div className="asideCities">
        		<HotelList getMapAndIso={this.getMapAndIso} getIso={this.getIso} expandCircle={this.expandCircle} curHotel={this.state.curHotel} ratingColors={this.state.ratingColors} hotelsGeoJSON={this.state.hotelsGeoJSON} activeColor={this.state.activeColor} hoverHotel={this.state.hoverHotel} zoom={this.zoom} city={this.state.city} chain={this.state.chain} hotels={this.state.hotels} getIso={this.getIso} getRestaurants={this.getRestaurants}/>
      	</div>
         	<div className="aside">
      	{shadeKey}
      	<RatingKey ratingColors={this.state.ratingColors} />
      	</div> 
     	</div>
     	<div className="bannerTop">
     		<Details resGeoObj={this.state.resGeoObj} dtls={this.state.details} curHotel={this.state.curHotel}/>
     	</div>
        	<div className="asider">
      	   <RestaurantStats maxReviews={this.state.maxReviews} pxScore={this.state.pxScore} rtngScore={this.state.rtngScore} rvwsScore={this.state.rvwsScore} />
 				<RestaurantTable expandRestCircle={this.expandRestCircle} dtls={this.state.details} resGeoObj={this.state.resGeoObj}/>
      	</div>
      </div>
    );
  }
}
export default App;
