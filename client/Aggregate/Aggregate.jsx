import { Col, Panel } from 'react-bootstrap';
import React, { Component } from 'react';

import {
  BrowserRouter,
  Route,
  NavLink,
  HashRouter,
  Link,
} from "react-router-dom";

const Aggregate = (props) => {
  return (
    <div classname="aggregate">
      <a href="#">{props.stats}</a>
    </div>
  )
}



export default Aggregate;
