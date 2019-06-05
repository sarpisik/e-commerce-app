import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Jumbotron, Slide } from '../../components'
import { Categories } from '../../containers'
const limitProducts = -5
export default class Home extends Component {
  render() {
    const { authUser, productsState } = this.props
    return (
      <Container>
        <Slide
          categories={productsState.categories}
          products={productsState['Consumer-Electronics'].slice(limitProducts)}
        />
        {authUser || (
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
    )
  }
}
