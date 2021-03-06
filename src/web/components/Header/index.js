import React from 'react';
import Logo from './Logo';
import NavList from './NavList';
import SearchBar from './SearchBar';
import CountryBar from './CountryBar';
import { Container, Row, Navbar } from 'react-bootstrap';
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
          <CountryBar />
          <RouteBar />
        </Row>
      </Container>
    </header>
  );
};

export default Header;
export { Logo, NavList, SearchBar, CountryBar };
