import React, { Component } from 'react';
import ReactMapboxGl, { GeoJSONLayer } from "react-mapbox-gl";
import axios from 'axios'
import keys from '../keys.js'

const mapboxStyle = require("../style.json")

const Map = ReactMapboxGl({
  					accessToken: keys.mbk					
			});
console.log(mapboxStyle)
export default class View extends Component {
constructor(props) {
	super(props)

}

componentDidMount() {
  this.setState({
    isochrone: this.props.appState.isochrone
  })
}
render() {
  if(!this.props.iso) {
	return (
<Map
	center= {[this.props.appState.location[0], this.props.appState.location[1]]}
	zoom= {[13]}
  	style={mapboxStyle}
  	containerStyle={{
    height: this.props.appState.h,
    width: this.props.appState.w
  }}>
</Map>
)} else { return(
  <Map
  center= {[this.props.appState.location[0], this.props.appState.location[1]]}
  zoom= {[12]}
    style={mapboxStyle}
    containerStyle={{
    height: this.props.appState.h,
    width: this.props.appState.w
  }}>
    <GeoJSONLayer
  data={this.props.iso[0]}
  fillPaint={{
      "fill-color": "blue",
      "fill-opacity": .2
  }}
/>
<GeoJSONLayer
  data={this.props.iso[1]}
  fillPaint={{
      "fill-color": "blue",
      "fill-opacity": .5
  }}
/>
<GeoJSONLayer
  data={this.props.iso[2]}
  fillPaint={{
      "fill-color": "blue",
      "fill-opacity": .8
  }}
/>
</Map>
)
  }
}
}