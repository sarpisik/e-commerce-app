import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { LoginForm, PageTitle, PageBody } from '../../components';

const LoginPage = () => {
  return (
    <Container>
      <Row className="justify-content-center bg-light">
        <PageTitle title="Login" />
        <PageBody sm={4}>
          <LoginForm />
        </PageBody>
      </Row>
    </Container>
  );
};

export default LoginPage;
