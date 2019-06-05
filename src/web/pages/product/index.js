import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Category, Product } from '../../containers';

const ProductPage = ({ categoryName, prod }) => (
  <Container>
    <Product categoryName={categoryName} productId={prod} />
    <Row className="bg-white">
      <Category categoryName={categoryName} />
    </Row>
  </Container>
);

export default ProductPage;
