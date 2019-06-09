import React from 'react';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar } from 'react-bootstrap';
import Icon from '../../Icon';
import * as ROUTES from '../../../constants/routes';
import './index.css';

const NavList = ({ location }) => {
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
            <Nav.Link active={location.pathname === `/${ROUTES.CART}`}>
              <Icon icon="shopping-cart" />
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to={ROUTES.ACCOUNT}>
            <Nav.Link active={location.pathname === `/${ROUTES.ACCOUNT}`}>
              <Icon icon="user" />
            </Nav.Link>
          </LinkContainer>
          {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
        </Nav>
      </Navbar.Collapse>
    </>
  );
};

export default withRouter(NavList);
