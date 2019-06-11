import React from 'react';
import { Row } from 'react-bootstrap';
import { LoginForm, PageTitle, PageBody } from '../../components';

const LoginPage = () => (
  <Row className="justify-content-center bg-light">
    <PageTitle title="Login" />
    <PageBody sm={4}>
      <LoginForm />
    </PageBody>
  </Row>
);

export default LoginPage;
