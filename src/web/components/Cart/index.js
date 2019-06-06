import React, { PureComponent } from 'react';
import { Row, Col } from 'react-bootstrap';

export default class Cart extends PureComponent {
  render() {
    return (
      <Row>
        <Col sm={3}>price</Col>
        <Col sm>products</Col>
      </Row>
    );
  }
}
