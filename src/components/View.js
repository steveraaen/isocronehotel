import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import axios from 'axios'


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

	var url = 'https://api.mapbox.com/isochrone/v1/mapbox/driving/-3.703790,40.416775?contours_minutes=5,10,15&contours_colors=6706ce,04e813,4286f4&polygons=true&access_token=pk.eyJ1Ijoic3JhYWVuIiwiYSI6ImNqcGxudTVwaDBnNGQ0OW1sZ2NhcjVyZm8ifQ.J6sCIBi_knv8qU39mHqprA'
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

	return (
<Map
	center= {[-3.703790, 40.416775]}
	zoom= {[13]}
  	style="mapbox://styles/mapbox/streets-v9"
  	containerStyle={{
  	 left: w * .2,
    height: h,
    width: w
  }}>
    <Layer
      type="symbol"
      id="marker"
      layout={{ "icon-image": "marker-15" }}>
    
    </Layer>
</Map>
)
}
}