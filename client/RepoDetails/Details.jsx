import React, { Component } from "react";
import './Details.css'
import Header from '../header/header.jsx';
import d3 from 'd3';
const PieChart = require('react-d3-components').PieChart;

const data = [];

const Details = (details) => {
  console.log(details.details.languages)
  if(details.details.languages){
    Object.keys(details.details.languages).forEach((language) => {
      data.push({x: language, y: details.details.languages[language]})
    })
  }
  return (
    <div>
      <Header />
      {
      details.details.languages &&
        <PieChart
          data={{
            label: 'languages',
            values: data
          }}
          width={600}
          height={600}
          margin={{top: 10, bottom: 10, left: 100, right: 100}}
          tooltipOffset={{top: 200, left:1050}}
          tooltipHtml={ function(x, y) {
            // console.log(x, y)
            return `${x}: ${y}`;
          }}
          tooltipMode={'fixed'}
          sort={null}
          />
      }
      <h2>{details.details.orgName}: {details.details.name}</h2>
      <p>{details.details.description}</p>
      <ol>
        <li>Forks: {details.details.forks}</li>
        <li>Open Issues: {details.details.open_issues}</li>
        <li>Watchers: {details.details.watchers}</li>
      </ol>
      <p>Go to <a href="http://github.com">Github Repo</a></p>
    </div>
  );
}

export default Details;
