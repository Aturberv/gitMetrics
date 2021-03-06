import { Col, Panel } from 'react-bootstrap';
import React, { Component } from 'react';
import './Box.css'





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
              src={ item.avatar_url ? `${item.avatar_url}` : "https://avatars1.githubusercontent.com/u/2735905?s=400&v=4"}

            />
        </div>

        <h4
          className="ellipsis"
          title={item.name}
          >
          <a
            onClick={() => {
              getCurrent(item)
            }}>
            {item.name}
          </a>
        </h4>

      </Panel>
    </Col>

  );
}


export default Box;
