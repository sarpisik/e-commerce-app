import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { SignUpForm, PageTitle, PageBody } from '../../components';

const SignUpPage = () => {
  return (
    <Container>
      <Row className="justify-content-center bg-light">
        <PageTitle title="Sign Up" />
        <PageBody sm={4}>
          <SignUpForm />
        </PageBody>
      </Row>
    </Container>
  );
};

export default SignUpPage;
