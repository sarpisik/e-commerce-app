import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { CategoriesList } from '../../containers'
import { navigateCategoriesList } from '../../components/Helpers'

const CategoriesPage = () => {
  return (
    <Container>
      <Row>
        <Col>
          <CategoriesList handleClick={navigateCategoriesList} />
        </Col>
      </Row>
    </Container>
  )
}

export default CategoriesPage
