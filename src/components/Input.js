import React, { Component } from 'react';
import { FormGroup, ControlLabel,  Well } from 'react-bootstrap';
import axios from 'axios';
import eucities from '../eucities.js';
import keys from '../keys.js';
const list = ["AND", "ARG", "ARM", "AUS", "AUT", "BEL", "CAN", "CHE", "CYP", "DEU", "DNK", "ESP", "EST", "FIN", "FRA", "GBR", "GIB", "GRC", "HRV", "IRL", "ITA", "JEY", "LTU", "LUX", "LVA", "MCO", "MNE", "NLD","NOR", "NZL", "POL", "PRT", "ROU", "SVK", "SVN", "TUR", "USA"]
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
      let url = "http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=" + keys.hereID +"&app_code=" + keys.hereCode + "&query=" +this.state.value +"&language=en&&country=" + list + "matchLevel=areas&maxresults=20"
      axios.get(url).then(resp => {
        let fltrd = resp.data.suggestions.filter((plc, idx) => {
          return plc.matchLevel === "city"
        })
        console.log(resp)
        this.setState({
          label: resp.data.suggestions,
          filtered: fltrd
        })
    })
  })
/*    	var ccty=[]
    	eucities.map((cty, idx) => {
    		if(cty.city.toUpperCase().includes(this.state.value.toUpperCase())) {
    		ccty.push(cty)
    		 }  
         return ccty  		
    	})
    	this.setState({cmap: ccty})
    });*/

  }
  handleClick(ct, lo, la){
  	this.props.getMapAndIso(ct, lo, la)
   this.setState({cmap: ""})
  }
	componentDidMount() {

	}
	render() {
    if(this.state.filtered) {
      var plcs = this.state.filtered.map((lbl, idx) =>{
        return(<li key={idx} style={{flexDirection: 'column'}}><button key={idx}>{lbl.label}</button></li>)
      })
    } else { plcs = null}

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
         <ul style={{maxHeight: '38vh', overflow: 'auto', listStyleType:"none", flexDirection: 'column', flexWrap: 'wrap'}}>{plcs}</ul>
     
        </FormGroup>
      </form>
			</Well>
			)
	}
}


