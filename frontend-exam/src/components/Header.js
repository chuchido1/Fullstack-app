import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Navbar.Brand as={Link} to="/">
        Home
      </Navbar.Brand>

      <Nav className="me-auto">
        <Nav.Link as={Link} to="/users">
          Users
        </Nav.Link>

        <Nav.Link as={Link} to="/items">
          Items
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Header;
