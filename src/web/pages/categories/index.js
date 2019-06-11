import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { CategoriesList } from '../../containers';
import { navigateCategoriesList } from '../../components/Helpers';

const CategoriesPage = () => (
  <Row>
    <Col>
      <CategoriesList handleClick={navigateCategoriesList} />
    </Col>
  </Row>
);

export default CategoriesPage;
