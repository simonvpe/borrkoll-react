import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'

import Navbar from 'react-bootstrap/lib/Navbar'
import NavbarHeader from 'react-bootstrap/lib/NavbarHeader'
import NavbarBrand from 'react-bootstrap/lib/NavbarBrand'
import NavbarCollapse from 'react-bootstrap/lib/NavbarCollapse'
import NavbarToggle from 'react-bootstrap/lib/NavbarToggle'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer'

export const Header = () => (
  <Navbar>
    <Navbar.Header>
      <LinkContainer to='/'>
        <Navbar.Brand>Borrkoll</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to='projects'>
          <NavItem eventKey={1}>Projects</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
