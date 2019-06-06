import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './index.css';
import { LoginForm } from '../../components';

const LoginPage = () => {
  return (
    <Container>
      <Row className="justify-content-center bg-light">
        <Col className="login-form-col pt-3" sm={9}>
          <h3>Login</h3>
          <hr />
        </Col>

        <Col className="login-form-col" sm={4}>
          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
