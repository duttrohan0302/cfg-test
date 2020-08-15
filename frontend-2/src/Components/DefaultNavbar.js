import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { useLocation } from 'react-router';

const DefaultNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const { pathname } = useLocation();


  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/" active={pathname==='/dashboard' || pathname==='/'} style={{fontSize:20}}>Team 71</NavLink>
          </NavItem>
        </Nav>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/login" active={pathname==='/login'}>Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/register" active={pathname==='/register'}>Register</NavLink>
            </NavItem>
            
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default DefaultNavbar;