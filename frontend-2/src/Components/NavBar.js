import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  Button,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

import PropTypes from 'prop-types';
import { logout } from '../Actions/authActions';
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router';

const NavBar = ({ logout}) => {

  const { pathname } = useLocation();
  console.log(pathname)
  // const history = useHistory();
  // console.log(location)
  // console.log(history)
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/" active={pathname==='/dashboard' || pathname==='/'} style={{fontSize:20}}>Team 71</NavLink>
          </NavItem>
        </Nav>
        {/* <NavbarBrand href="/" active={pathname==='/dashboard' || pathname==='/'}>Team 71</NavbarBrand> */}
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/mlModel" active={pathname==="/mlModel"}>ML Model</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/myProfile" active={pathname==="/myProfile"}>Profile</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar setActiveFromChild>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu left>
                <DropdownItem>
                  Create Event
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>
            <Button onClick={logout} color="danger">
            <i className="fa fa-sign-out" aria-hidden="true"></i>
              Logout
            </Button>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps,{ logout })(NavBar);