import React from 'react';
import { Spinner } from 'react-bootstrap';

const INITIAL_STYLE = {
  position: 'absolute',
  zIndex: 100,
  left: '50%',
  marginLeft: '-22px',
  marginTop: '-22px'
};

export default ({ style = { top: '50%' } }) => (
  <Spinner
    style={{ ...INITIAL_STYLE, ...style }}
    animation="border"
    role="status"
    variant="warning">
    <span className="sr-only">Loading...</span>
  </Spinner>
);
