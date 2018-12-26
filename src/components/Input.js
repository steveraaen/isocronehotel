import React, { Component } from 'react';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock, Navbar, Well } from 'react-bootstrap';
import Typeahead from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css'
import axios from 'axios';
import keys from '../keys';
import allCities from '../cities';

allCities.sort((a,b) => (a.city > b.city) ? 1 : ((b.city > a.city) ? -1 : 0)); 

export default class Input extends Component {
	constructor(props) {
		super(props)
		this.state={
			value: ""
		}
		this.handleChange = this.handleChange.bind(this)
	}
	  handleChange(e) {
    this.setState({ value: e.target.value }, () => {
    	var ccty=[]
    	allCities.map((cty, idx) => {
    		if(cty.city.toUpperCase().includes(this.state.value.toUpperCase())) {
    		ccty.push(cty)
    		 }    		
    	})
    	this.setState({cmap: ccty})
    });
  }
  handleClick(ct, lo, la){
  	this.props.getMapAndIso(ct, lo, la)
   this.setState({cmap: ""})
  }
/*	componentDidMount() {
		axios.get('https://api.opencagedata.com/geocode/v1/json?key=' + keys.ocg + '&q=Frauenplan+1%2C+99423+Weimar%2C+Germany&pretty=1')
		.then((resp, error) => {
			this.setState({
				ocResp: resp
			})
		})
	}*/
	render() {
		if(this.state.cmap) {
		var matches = this.state.cmap.map((lne, idx) => {
			return(<li key={idx} onClick={() => this.handleClick(lne.city,[lne.lng, lne.lat])}>{lne.city + ", " + lne.country} </li>)
		})
		}
		return (
			<Well>
      <form>
        <FormGroup
          controlId="formBasicText"
        >
        <div style={{display: 'flex',flexDirection: 'column'}}>
          <ControlLabel>Enter the name of a place or an address</ControlLabel>
          <input           
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange}
          />
         </div>
         <ul style={{maxHeight: '38vh', overflow: 'auto', listStyleType:"none"}}>{matches}</ul>
     
        </FormGroup>
      </form>
			</Well>
			)
	}
}


