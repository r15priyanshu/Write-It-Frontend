import { NavLink as ReactNavLink, useNavigate } from "react-router";
import { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

function MyNavbar(props) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  function handleLogout() {}

  return (
    <div className="MyNavbar">
      <Navbar color="dark" dark expand="md">
        <NavbarBrand tag={ReactNavLink} to="/home">
          <i className="fa-sharp fa-solid fa-marker"></i>WRITE-IT
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactNavLink} to="/home">
                HOME
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactNavLink} to="/about">
                ABOUT
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactNavLink} to="/posts/category/All">
                ALL POSTS
              </NavLink>
            </NavItem>
          </Nav>

          <Nav className="ms-auto" navbar>
            <NavItem>
              <NavLink tag={ReactNavLink} to="/login">
                LOGIN
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactNavLink} to="/register">
                REGISTER
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default MyNavbar;
