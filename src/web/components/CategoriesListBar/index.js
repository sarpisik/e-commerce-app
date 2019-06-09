import React from 'react';
import { Col } from 'react-bootstrap';
import { CategoriesList } from '../../containers';
import { CollapseContainer } from '..';
import { navigateCategoriesList } from '../Helpers';

const CategoriesListBar = () => (
  <Col className="p-0 bg-white " md={12}>
    <CollapseContainer title="Categories" variant="outline-primary" block>
      <CategoriesList handleClick={navigateCategoriesList} />
    </CollapseContainer>
  </Col>
);

export default CategoriesListBar;
