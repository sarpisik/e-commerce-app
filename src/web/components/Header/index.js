import React from 'react';
import Logo from './Logo';
import NavList from './NavList';
import SearchBar from './SearchBar';
import CountryBar from './CountryBar';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import RouteBar from './RouteBar';

const Header = () => {
  return (
    <header className="bg-dark">
      <Container>
        <Navbar
          className="px-0"
          collapseOnSelect
          bg="dark"
          variant="dark"
          expand="lg">
          <Logo />
          <NavList />
          <SearchBar />
        </Navbar>
        <Row noGutters className="bg-dark align-items-center">
          <Col sm={12} className="text-left">
            <CountryBar />
          </Col>
          <Col sm={12} className="text-left route-tabs">
            <RouteBar />
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
export { Logo, NavList, SearchBar, CountryBar };
