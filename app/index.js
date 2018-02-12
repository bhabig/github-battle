import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
require('./index.css');
// state
// lifecycle event i.e. added or removed from screen
// UI of component *only requirement set with render*( method)


ReactDOM.render(
  <div>
    <App />
  </div>,
  document.getElementById('app')
);
