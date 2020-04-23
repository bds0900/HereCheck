import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom'
import './index.css';
import App from './App';


ReactDOM.render(
  <HashRouter basename={process.env.PUBLIC_URL}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </HashRouter>,
  document.getElementById('root')
);


