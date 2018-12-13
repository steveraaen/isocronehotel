import React, { Component } from 'react';
import ReactMapboxGl, { GeoJSONLayer } from "react-mapbox-gl";
import axios from 'axios'

const mapboxStyle = "mapbox://styles/mapbox/streets-v9"
var w = window.innerWidth * .8;
var h = window.innerHeight;
const Map = ReactMapboxGl({
  					accessToken: "pk.eyJ1Ijoic3JhYWVuIiwiYSI6ImNqcGxudTVwaDBnNGQ0OW1sZ2NhcjVyZm8ifQ.J6sCIBi_knv8qU39mHqprA"
					
			});
export default class View extends Component {
constructor(props) {
	super(props)
	this.state = {
		isochrone: {}
	}

}

componentDidMount() {

	var url = 'https://api.mapbox.com/isochrone/v1/mapbox/walking/-3.703790,40.416775?contours_minutes=5,10,15&contours_colors=6706ce,04e813,4286f4&polygons=true&access_token=pk.eyJ1Ijoic3JhYWVuIiwiYSI6ImNqcGxudTVwaDBnNGQ0OW1sZ2NhcjVyZm8ifQ.J6sCIBi_knv8qU39mHqprA'
		axios.get(url)
		  .then( (response) =>{
		  	this.setState({
		  		isochrone: response.data.features
		  	})
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
}
render() {
console.log(this.state.isochrone)
	return (
<Map
	center= {[-3.703790, 40.416775]}
	zoom= {[13]}
  	style={mapboxStyle}
  	containerStyle={{
  	 left: w * .2,
    height: h,
    width: w
  }}>
<GeoJSONLayer
  data={this.state.isochrone[0]}
  fillPaint={{
  		"fill-color": "blue",
  		"fill-opacity": .2
  }}
/>
<GeoJSONLayer
  data={this.state.isochrone[1]}
  fillPaint={{
  		"fill-color": "blue",
  		"fill-opacity": .5
  }}
/>
<GeoJSONLayer
  data={this.state.isochrone[2]}
  fillPaint={{
  		"fill-color": "blue",
  		"fill-opacity": .8
  }}
/>
</Map>
)
}
}