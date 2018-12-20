import React, { Component } from 'react';
import ReactMapboxGl, { Feature, GeoJSONLayer, Layer, Marker } from "react-mapbox-gl";
import ReactTooltip from 'react-tooltip'
import axios from 'axios'
import keys from '../keys.js'
import './CompStyles.css';
const mapboxStyle = require("../mbxdull/style.json")

const Map = ReactMapboxGl({
  					accessToken: keys.mbk					
			});
console.log(mapboxStyle)
export default class View extends Component {
constructor(props) {
	super(props)
}

render() {

// ---------------- make isochromes  
if(this.props.isoList) {
  var isos = this.props.isoList.map((iso, idx) => {
    console.log(iso)
return (<GeoJSONLayer  key={idx} data={iso}   fillPaint={{ "fill-color": "blue", "fill-opacity": .3}}/>)
  })
} else { return  (<div>+++++++++++++++++++++++++++</div>)}

// ------------------ make hotel markers
  if(this.props.hotels ) { 
  var mkrs= this.props.hotels.map((htl, idx) => {  
  return(
<Marker 
    key={idx} 
    onClick={() => {console.log(htl.name)}} 
    coordinates={[htl.coordinates.longitude, htl.coordinates.latitude]}
    anchor="topRight"
      offset={{
    'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
  }}>
    <h4>{this.props.appState.chain}</h4>
    </Marker>
    )
})
} else { return  (<div>..............................</div>)}

  if(!this.props.iso) {
	return (
    <div>
    
<Map
	center= {[this.props.appState.location[0], this.props.appState.location[1]]}
	zoom= {[this.props.appState.zoom]}
  	style={mapboxStyle}
  	containerStyle={{
    height: this.props.appState.h,
    width: this.props.appState.w
  }}>
  {isos}
       <div >
     {mkrs}
    </div>
</Map>
</div>
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
