import React, { Component } from 'react';
import './App.css';
import Map from './components/View.js';
import Hotels from './components/Hotels.js';

class App extends Component {
  render() {
    return (
      <div>
        <Map />
        <Hotels />
      </div>
    );
  }
}

export default App;
