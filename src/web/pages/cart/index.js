import React from 'react';
import { Row } from 'react-bootstrap';
import { withAuthorization } from '../../session';
import * as ROUTES from '../../constants/routes';
import { PageTitle, PageBody, Cart } from '../../components';

const CartPage = ({ authUser }) => (
  <Row className="justify-content-center bg-light">
    <PageTitle title="My Cart" />
    <PageBody sm={9}>
      <Cart products={authUser.cart} />
    </PageBody>
  </Row>
);

export default withAuthorization(true)(ROUTES.LOGIN)(CartPage);
