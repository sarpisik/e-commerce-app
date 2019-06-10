import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import logo from '../../../assets/logo/logo_sarp_isik.svg';
import * as ROUTES from '../../../constants/routes';

const LogoBar = () => {
  return (
    <Navbar.Brand className="mb-3 mb-sm-0" href="#home">
      <Link to={ROUTES.HOME}>
        <img
          src={logo}
          width="50"
          height="50"
          className="d-inline-block align-top"
          alt="brand logo"
        />
      </Link>
    </Navbar.Brand>
  );
};

export default LogoBar;
