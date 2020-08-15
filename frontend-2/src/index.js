import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import './assets/css/bootstrap.min.css';
import './assets/css/owl.carousel.min.css';
import './assets/css/slicknav.css';
import './assets/css/flaticon.css';
import './assets/css/animate.min.css';
import './assets/css/magnific-popup.css';
import './assets/css/fontawesome-all.min.css';
import './assets/css/themify-icons.css';
import './assets/css/slick.css';
import './assets/css/nice-select.css';
//
// import './assets/js/vendor/modernizr-3.5.0.min.js';
// import './assets/js/vendor/jquery-1.12.4.min.js';
// import './assets/js/popper.min.js';
// import './assets/js/bootstrap.min.js';
// // import './assets/js/jquery.slicknav.min.js';
// import './assets/js/owl.carousel.min.js';
// // import './assets/js/slick.min.js';
// import './assets/js/wow.min.js';
// import './assets/js/animated.headline.js';
// // import './assets/js/jquery.magnific-popup.js';
// // import './assets/js/jquery.nice-select.min.js';
// // import './assets/js/jquery.sticky.js';
// import './assets/js/contact.js';
// // import './assets/js/jquery.form.js';
// // import './assets/js/jquery.validate.min.js';
// import './assets/js/mail-script.js';
// // import './assets/js/jquery.ajaxchimp.min.js';
// import './assets/js/plugins.js';
// import './assets/js/main.js';


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
