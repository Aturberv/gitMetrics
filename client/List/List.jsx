import { Col, Panel } from 'react-bootstrap';
import React, { Component } from 'react';
import Box from '../Box/Box.jsx';
import './List.css';


const List = (props) => {
    return (

      <div className="repos">
        {
            props.items.map((item, idx) => (
              <Box
                key={idx}
                item={item}
                getCurrent={props.getCurrent}
              />
            ))
          }
      </div>
    );
}



export default List;
