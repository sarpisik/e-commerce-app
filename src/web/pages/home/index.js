import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Jumbotron, Slide } from '../../components';
import { Categories } from '../../containers';
import { withAuthUser } from '../../session';
const limitProducts = -5;

const Home = ({ authUser = null, productsState }) => {
  return (
    <Container>
      <Slide
        categories={productsState.categories}
        products={productsState['Consumer-Electronics'].slice(limitProducts)}
      />
      {!authUser && (
        <Row>
          <Col sm="12">
            <Jumbotron />
          </Col>
        </Row>
      )}

      <Row>
        <Categories />
      </Row>
    </Container>
  );
};

export default withAuthUser(Home);
