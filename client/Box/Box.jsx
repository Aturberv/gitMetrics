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

  // console.log('Box', item);

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
