import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { withAuthorization } from '../../session';
import * as ROUTES from '../../constants/routes';
import { PageTitle, PageBody, SignOut } from '../../components';

const AccountPage = ({ authUser, signOut }) => {
  console.log(authUser);

  return (
    <Container>
      <Row className="justify-content-center bg-light">
        <PageTitle title="My Account" />
        <PageBody sm={4}>
          <SignOut onClick={signOut} />
        </PageBody>
      </Row>
    </Container>
  );
};

export default withAuthorization(true)(ROUTES.LOGIN)(AccountPage);
