import React from 'react';
import { Col } from 'react-bootstrap';
import './index.css';

const PageBody = ({ children, ...props }) => (
  <Col className="page-body" {...props}>
    {children}
  </Col>
);

export default PageBody;
