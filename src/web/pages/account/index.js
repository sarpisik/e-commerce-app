import React from 'react';
import { Row } from 'react-bootstrap';
import { withAuthorization } from '../../session';
import * as ROUTES from '../../constants/routes';
import { PageTitle, PageBody, SignOut } from '../../components';

const AccountPage = ({ signOut }) => (
  <Row className="justify-content-center bg-light">
    <PageTitle title="My Account" />
    <PageBody sm={4}>
      <SignOut onClick={signOut} />
    </PageBody>
  </Row>
);

export default withAuthorization(true)(ROUTES.LOGIN)(AccountPage);
