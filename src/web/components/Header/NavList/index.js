import React from 'react';
import { withAuthUser } from '../../../session';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar } from 'react-bootstrap';
import IconLink from './IconLink';

import * as ROUTES from '../../../constants/routes';
import './index.css';

const NavList = ({ location, authUser }) => {
  return (
    <>
      <Navbar.Toggle
        className="mb-3 mb-sm-0"
        aria-controls="responsive-navbar-nav"
      />
      <Navbar.Collapse
        className="order-sm-2 flex-lg-grow-0"
        id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <LinkContainer to={ROUTES.CART}>
            <Nav.Link
              className="position-relative"
              active={location.pathname === `/${ROUTES.CART}`}>
              <IconLink
                name="My Cart"
                icon="shopping-cart"
                badge={
                  authUser &&
                  authUser.cart &&
                  authUser.cart.length > 0 &&
                  authUser.cart.length
                }
              />
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to={ROUTES.ACCOUNT}>
            <Nav.Link
              className="position-relative"
              active={location.pathname === `/${ROUTES.ACCOUNT}`}>
              <IconLink name="Account" icon="user" />
            </Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </>
  );
};

export default withAuthUser(NavList);
