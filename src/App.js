import React, { Component } from 'react';
import './App.css';
import dataService from './services/dataService';
import LibrariesGrid from './components/LibrariesGrid';

let data = [];

class App extends Component {
  render() {
    return (
      <div className="App">
        <LibrariesGrid data={data} />
      </div>
    );
  }

  componentDidMount() {
    dataService.getReactStylingLibraries().then(response => {
      data = response;
      this.forceUpdate();
    });
  }
}

export default App;
