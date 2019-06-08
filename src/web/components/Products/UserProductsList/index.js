import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FormContainer, CheckBox, ListItem } from '../..';
import withProductsList from '../../HOCs/withProductsList';

const UserProductsList = ({ products, onNavigate, onChange }) => {
  return (
    <ul className="list-unstyled responsive mb-0">
      {products.map((product, index) => (
        <Row key={index} className="bg-white my-1">
          <Col
            xs={1}
            className="d-flex align-items-center justify-content-center">
            <FormContainer className="m-0">
              <CheckBox name={product._id} onChange={onChange} />
            </FormContainer>
          </Col>
          <Col>
            <ListItem onNavigate={onNavigate} {...product} />
          </Col>
        </Row>
      ))}
    </ul>
  );
};

export default withProductsList(UserProductsList);
