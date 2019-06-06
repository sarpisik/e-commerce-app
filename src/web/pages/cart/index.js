import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { withAuthorization } from '../../session';
import * as ROUTES from '../../constants/routes';

const CartPage = () => {
  return (
    <Container>
      <Row className="justify-content-center bg-light">
        <Col className="login-form-col pt-3" sm={9}>
          <h3>My Cart</h3>
          <hr />
        </Col>

        <Col className="login-form-col" sm={4}>
          products
        </Col>
      </Row>
    </Container>
  );
};

export default withAuthorization(true)(ROUTES.LOGIN)(CartPage);
