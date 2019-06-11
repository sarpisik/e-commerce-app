import React from 'react';
import { Row } from 'react-bootstrap';
import { SignUpForm, PageTitle, PageBody } from '../../components';

const SignUpPage = () => (
  <Row className="justify-content-center bg-light">
    <PageTitle title="Sign Up" />
    <PageBody sm={4}>
      <SignUpForm />
    </PageBody>
  </Row>
);

export default SignUpPage;
