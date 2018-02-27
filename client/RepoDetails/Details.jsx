import React, { Component } from "react";
import './Details.css'

const Details = (details) => {
  console.log(details);
  return (
    <div>
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
