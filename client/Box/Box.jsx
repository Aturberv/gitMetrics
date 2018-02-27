import { Col, Panel } from 'react-bootstrap';
import React, { Component } from 'react';
import './Box.css'


// const divStyle = {
//   background-color: 'blue',
// };



function Box(props) {
  let {
    getCurrent,
    item
  } = props;


  return (
    <Col
      lg={3}
      md={4}
      sm={6}>
      <Panel className="repo" >
        <div className="repo-img-wrapper">
            <img
              alt={item.name}
              className="img-responsive repo-img"
              src={`${item.avatar}`}
              onClick={() => {
                getCurrent(item)
              }}
            />
        </div>

        <h4
          className="ellipsis"
          title={item.name}
          >
          <a href={`${item.url}`}>
            {item.name}
          </a>
        </h4>

        <h5
          className="ellipsis repo-brand-name"
          title={item.name}>
        </h5>

        <div className="pull-right h4 repo-link">
          {`${item.name}`}
        </div>

      </Panel>
    </Col>

  );
}

// Repo.propTypes = {
//   repo: React.PropTypes.object.isRequired
// };


export default Box;
