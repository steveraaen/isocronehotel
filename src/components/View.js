import React, { Component } from 'react';
import ReactMapboxGl, { Feature, GeoJSONLayer, Layer, Marker, Popup } from "react-mapbox-gl";
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
  this.state={
    puvis: 'hidden'
  }
}
componentDidMount(){

}

render() {
console.log(this.props.hotelsGeoJSON)
// ---------------- make isochromes  
if(this.props.isoList) {
  var isos = this.props.isoList.map((iso, idx) => {

return (<GeoJSONLayer  key={idx} data={iso}   fillPaint={{ "fill-color": "blue", "fill-opacity": .2}}/>)
  })
} else { return  (<div>+++++++++++++++++++++++++++</div>)}

// ------------------ make hotel markers
  if(this.props.hotelsGeoJSON) { 
var points = this.props.hotelsGeoJSON.map(( pt, idx) => {
return(
    <GeoJSONLayer 

        key={idx}
        data={pt}      
        type='circle'
        circlePaint={{
          'circle-color': [ 
          'match',
          ['get', 'rating'],
          2, '#fbb03b',
          3, '#223b53',
          4, '#e55e5e',
          5, '#3bb2d0',
          /* other */ '#ccc' 
          ]
        }}

      />
)
})
} else { return  (<div>..............................</div>)}

  if(!this.props.iso && this.props.hotelsGeoJSON) {
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
  <div>{points}</div>

  <div>{isos}</div>

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
