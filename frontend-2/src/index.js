import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './assets/main.css';
// import './assets/images/logo-inverse.png';
// import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
// import './assets/fonts/Linearicons-Free-v1.0.0/icon-font.min.css';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
