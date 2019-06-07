import React, { PureComponent } from 'react';
import { Row, Col } from 'react-bootstrap';
import { ProductsList } from '..';

// TODO: Merge this component to products HOC

export default class Cart extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      products: props.products,
      selectedProducts: []
    };
  }

  render() {
    const { products, selectedProducts } = this.state;
    return (
      <Row>
        <Col sm={3}>price</Col>
        <Col sm>
          <ProductsList list={products} />
        </Col>
      </Row>
    );
  }
}
