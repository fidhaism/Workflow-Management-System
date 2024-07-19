import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            alt="Logo"
            src="https://www.pngrepo.com/png/375519/512/workflows.png"
            width="30"
            height="30"
            className="d-inline-block align-top mr-2"
          />
          <span className="text-white font-weight-bold" style={{ fontSize: '1.5rem', fontFamily: 'Arial, sans-serif' }}>Workflow Application</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          {/* No login button */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
