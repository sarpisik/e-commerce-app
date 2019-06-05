import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar } from 'react-bootstrap';
import Icon from '../../Icon';
import * as ROUTES from '../../../constants/routes';
import './index.css';

const NavList = () => {
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
          <LinkContainer to={ROUTES.HOME}>
            <Nav.Link href="#home">
              <Icon icon="shopping-cart" />
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to={ROUTES.LOGIN}>
            <Nav.Link>
              <Icon icon="user" />
            </Nav.Link>
          </LinkContainer>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </>
  );
};

export default NavList;
