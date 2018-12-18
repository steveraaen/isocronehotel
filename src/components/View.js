import React, { Component } from 'react';
import ReactMapboxGl, { Feature, GeoJSONLayer, Layer } from "react-mapbox-gl";
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



render() {
if(this.props.isoList) {
  var isos = this.props.isoList.map((iso, idx) => {
    console.log(iso)
return (<GeoJSONLayer  key={idx} data={iso}   fillPaint={{ "fill-color": "blue", "fill-opacity": .4}}/>)
  })
} else { return  (<div>+++++++++++++++++++++++++++</div>)}

  if(this.props.hotels ) { 
  var mkrs= this.props.hotels.map((htl, idx) => {  
  return(
<Feature key={idx} coordinates={[htl.coordinates.longitude, htl.coordinates.latitude]}/>
    )
})
} else { return  (<div>..............................</div>)}


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
  {isos}
       <Layer type="symbol" id="marker" >
     {mkrs}
    </Layer>
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



</Map>
)
  }
}
}
