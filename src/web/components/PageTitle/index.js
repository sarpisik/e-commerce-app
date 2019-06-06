import React from 'react';
import { Col } from 'react-bootstrap';

const PageTitle = ({ title }) => (
  <Col className="page-body pt-3" sm={9}>
    <h3>{title}</h3>
    <hr />
  </Col>
);

export default PageTitle;
