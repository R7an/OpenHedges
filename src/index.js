import React from 'react';
import ReactDOM from 'react-dom';
import App from './app'
import registerServiceWorker from './registerServiceWorker';

// Reset all CSS settings in browsers
import "./styles/importer.css";

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
