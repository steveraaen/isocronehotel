import React, { Component } from 'react';
import ReactMapboxGl, { GeoJSONLayer, Popup } from "react-mapbox-gl";
import keys from '../keys.js'
import './CompStyles.css';
const mapboxStyle = require("../mbxdull/style.json")

const Map = ReactMapboxGl({
  					accessToken: keys.mbk					
			});

export default class View extends Component {
constructor(props) {
	super(props)
  this.state={
    puvis: 'hidden'
  }
  this.handleHover = this.handleHover.bind(this)
}

handleHover(b) {
  console.log(b)
  this.props.hover(b)
  
}
handleHoverOut() {
  this.props.hoverOut()
  
}
render() {
  if(this.props.hoverHotel) {
    var dynColor = this.props.hoverHotel.properties.ratingCol
    var ppup = (
    <Popup
     style={{backgroundColor: dynColor}}
      coordinates={this.props.hoverHotel.geometry.coordinates}
      offset={{
        'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
      }}>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{fontSize: "18pt", fontWeight: "bold", backgroundColor: this.props.hoverHotel.properties.ratingCol,  padding: "24px", margin: "-26px", borderWidth: "1px", borderRadius: "6px"}}>{this.props.hoverHotel.properties.name}</div>
      </div>
    </Popup>
      )} else {ppup = null}
// ---------------- make isochromes  
if(this.props.isoList) {
  var isos = this.props.isoList.map((iso, idx) => {
return (<GeoJSONLayer 

          key={idx} 
          data={iso}   
          fillPaint={{ "fill-color": "white", "fill-opacity": .20}}/>)
  })
} else { return  (<div>+++++++++++++++++++++++++++</div>)}

// ------------------ make hotel markers
  if(this.props.hotelsGeoJSON && !this.props.resGeoObj) { 
var points = this.props.hotelsGeoJSON.map(( pt, idx) => {
return(
    <GeoJSONLayer      
        circleOnMouseEnter={() => this.handleHover(pt)}
        circleOnMouseLeave={() => this.handleHoverOut()}
      
        key={idx}
        data={pt}      
        type='circle'
        circlePaint={{
          'circle-color': [ 
          'match',
          ['get', 'rating'],
          ["1"], '#FFDA70',
          ["1.5"], '#FF9878',
          ["2"], '#FF80A3',
          ["2.5"], '#FF89E5',
          ["3"], '#DE91FF',
          ["3.5"], '#AD99FF',
          ["4"], '#A2BFFF',
          ["4.5"], '#AAF0FF',
          ["5"], '#B3FFE4',
          /* other */ 'cyan' 
          ],
        'circle-radius': {stops: [[14, 10], [16, 8]]}
        }}
       

      />
)
})
} else if(this.props.resGeoObj) { 
var points = this.props.resGeoObj.features.map(( pt, idx) => {
return(
    <GeoJSONLayer      
        circleOnMouseEnter={() => this.handleHover(pt)}
        circleOnMouseLeave={() => this.handleHoverOut()}
      
        key={idx}
        data={pt}      
        type='circle'
        circlePaint={{
          'circle-color': [ 
          'match',
          ['get', 'rating'],
          ["1"], '#FFDA70',
          ["1.5"], '#FF9878',
          ["2"], '#FF80A3',
          ["2.5"], '#FF89E5',
          ["3"], '#DE91FF',
          ["3.5"], '#AD99FF',
          ["4"], '#A2BFFF',
          ["4.5"], '#AAF0FF',
          ["5"], '#B3FFE4',
          /* other */ 'cyan' 
          ],
        'circle-radius': {stops: [[14, 10], [16, 8]]}
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
  <div>{ppup}</div>

</Map>

</div>
)} else { return(
  <Map
  center= {[this.props.appState.location[0], this.props.appState.location[1]]}
  zoom= {[this.props.appState.zoom]}
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
