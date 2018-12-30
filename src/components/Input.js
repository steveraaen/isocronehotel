import React, { Component } from 'react';
import { FormGroup, ControlLabel,  Well } from 'react-bootstrap';
import eucities from '../eucities.js';

/*eucities.sort((a,b) => (a.city > b.city) ? 1 : ((b.city > a.city) ? -1 : 0));*/ 

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
    	eucities.map((cty, idx) => {
    		if(cty.city.toUpperCase().includes(this.state.value.toUpperCase())) {
    		ccty.push(cty)
    		 }  
         return ccty  		
    	})
    	this.setState({cmap: ccty})
    });
  }
  handleClick(ct, lo, la){
  	this.props.getMapAndIso(ct, lo, la)
   this.setState({cmap: ""})
  }
/*	componentDidMount() {
let url = `http://autocomplete.geocoder.api.here.com/6.2/suggest.json
  ?app_id=${keys.hereID}
  &app_code=${keys.hereCode}
  &query=${this.state.value}
  &beginHighlight=<b>
  &endHighlight=</b>`

  axios.get(url).then(resp => {
    this.setState({autoResp: resp})
  })
	}*/
	render() {
		if(this.state.cmap) {
		var matches = this.state.cmap.map((lne, idx) => {
			return(<div key={idx} style={{flexDirection: 'column'}}><button style={{minWidth: '20vw'}}onClick={() => this.handleClick([lne.city, lne.cntrycode],[lne.lng, lne.lat])}>{lne.city + ", " + lne.cntrycode} </button></div>)
		})
		}
		return (
			<Well style={{backgroundColor: 'gray'}}>
      <form>
        <FormGroup
          controlId="formBasicText"
        >
        <div style={{color: 'white', display: 'flex',flexDirection: 'column'}}>
          <ControlLabel>Enter the name of a place or an address</ControlLabel>
          <input
            style={{color: 'black'}}           
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange}
          />
         </div>
         <ul style={{maxHeight: '38vh', overflow: 'auto', listStyleType:"none", flexDirection: 'column', flexWrap: 'wrap'}}>{matches}</ul>
     
        </FormGroup>
      </form>
			</Well>
			)
	}
}


