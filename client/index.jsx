import React from 'react';
import { render } from 'react-dom';
import App from './app.jsx';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { BrowserRouter, Route } from 'react-router-dom'
import Routes from './Routes.jsx';




render(
  <App />,
  document.getElementById('app')
);
