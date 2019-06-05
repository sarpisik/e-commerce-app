import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Category, Product } from '../../containers';

const ProductPage = ({ cat, prod }) => (
  <Container>
    <Product categoryName={cat} productId={prod} />
    <Row className="bg-white">
      <Category categoryName={cat} />
    </Row>
  </Container>
);

export default ProductPage;
