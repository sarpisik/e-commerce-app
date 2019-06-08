import React from 'react';
import { Col, Button, Row } from 'react-bootstrap';

const PurchaseBar = ({ totalPrice, deleteSelecteds, loading }) => (
  <Col className="border-right bg-white" lg={3}>
    <p>Total price</p>
    <hr />
    <p className="text-center">
      <span>($) </span>
      {totalPrice}
    </p>
    <Row>
      <Col className="mb-3" md={6} lg={12}>
        <Button className="rounded-0" block>
          Order
        </Button>
      </Col>
      <Col className="mb-3" md={6} lg={12}>
        <Button
          className="rounded-0"
          onClick={deleteSelecteds}
          block
          variant="danger">
          {loading ? 'Please wait...' : 'Delete'}
        </Button>
      </Col>
    </Row>
  </Col>
);

export default PurchaseBar;
