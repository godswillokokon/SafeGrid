import React from 'react';
import ReactDOM from 'react-dom';

// Import jQuery
import $ from 'jquery';

// Bind jQuery to the window object
window.jQuery = window.$ = $;

require('libraries/bootstrap/js/bootstrap.min.js');

import Auth from 'helpers/auth';

import Router from 'components/router';

import './style.scss';


Auth.init().then(() => {
  ReactDOM.render(<Router />, document.getElementById('app'));
});

