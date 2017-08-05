import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import dataService from './services/dataService';

let data = [];
dataService.getReactStylingLibraries().then(response => {
  data = response;
});

ReactDOM.render(<App data={data} />, document.getElementById('root'));
registerServiceWorker();
