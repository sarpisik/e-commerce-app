import React from 'react'
import { Navbar } from 'react-bootstrap'
import logo from '../../../assets/logo/brand.png'

const LogoBar = () => {
  return (
    <Navbar.Brand className="mb-3 mb-sm-0" href="#home">
      <img
        src={logo}
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt="brand logo"
      />
    </Navbar.Brand>
  )
}

export default LogoBar
