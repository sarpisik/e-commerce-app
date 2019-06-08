import React from 'react';
import Form from 'react-bootstrap/Form';

export const RadioBox = ({ ...props }) => (
  <Form.Check type="radio" {...props} />
);

export const CheckBox = ({ ...props }) => <Form.Check {...props} />;

const FormContainer = ({ label = '', children, ...style }) => {
  return (
    <Form.Group {...style}>
      {label && <Form.Label>{label}</Form.Label>}
      {children}
    </Form.Group>
  );
};

export default FormContainer;
