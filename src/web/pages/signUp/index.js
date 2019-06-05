import React from 'react';
import { SignUpForm } from '../../containers';
import { Container, Row, Col } from 'react-bootstrap';

const SignUpPage = () => {
  return (
    <Container>
      <Row className="justify-content-center bg-light">
        <Col className="login-form-col pt-3" sm={9}>
          <h3>SignUp</h3>
          <hr />
        </Col>

        <Col className="login-form-col" sm={4}>
          <SignUpForm />
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
