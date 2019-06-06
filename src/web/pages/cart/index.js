import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { withAuthorization } from '../../session';
import * as ROUTES from '../../constants/routes';
import { PageTitle, PageBody } from '../../components';

const CartPage = () => {
  return (
    <Container>
      <Row className="justify-content-center bg-light">
        <PageTitle title="My Cart" />
        <PageBody sm={4}>cart</PageBody>
      </Row>
    </Container>
  );
};

export default withAuthorization(true)(ROUTES.LOGIN)(CartPage);
