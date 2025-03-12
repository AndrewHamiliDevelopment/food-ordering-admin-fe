import React, { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoginSignup from "./LoginSignup";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = ({ setIsLoginOpen, isLoginOpen }) => {
  return (
    <>
      <Navbar expand="md" bg="light" variant="light" className="shadow-sm">
        <Container fluid>
          {/* Logo */}
          <Navbar.Brand as={Link} to="/">
            <img
              src="/ninja.png"
              alt="Restaurant Logo"
              style={{ height: "50px", borderRadius: "5px" }}
            />
            <span className="ms-2 fw-bold fst-italic">ADMIN PORTAL</span>
          </Navbar.Brand>

          {/* Mobile Toggle Button */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Navigation Links */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/menu" className="fw-bold text-dark">
                ViewProduct
              </Nav.Link>
              <Nav.Link as={Link} to="/profile" className="fw-bold text-dark">
                AdminProfile
              </Nav.Link>
              <Button
                variant="outline-dark"
                className="fw-bold"
                onClick={() => setIsLoginOpen(true)}
              >
                MyAccount
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Login/Signup Popup */}
      {isLoginOpen && <LoginSignup isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />}
    </>
  );
};

export default Header;
