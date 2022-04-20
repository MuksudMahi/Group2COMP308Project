import { Nav, Container, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLogout,useAuthRoleToken } from "../../config/auth";

import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  let logout = useLogout();
  let navigate = useNavigate();
  const [authRoleToken] = useAuthRoleToken();

  return (
    <div>
      {authRoleToken === "Nurse"?(
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>
            Course Registration
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={() => navigate("/vitalSigns")}>Vital Signs</Nav.Link>
            </Nav>
            <Nav>
            <Nav.Link href="/vitalHistory">Vital History</Nav.Link>
            </Nav>
            <Nav>
            <Nav.Link href="/motivationalTipsView">Add Motivational Tips</Nav.Link>
            </Nav>
            <Nav>
            <Nav.Link href="/emergencyAlertHistory">Emergency Alert History</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={logout} href="/">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>)
      
      :(

        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>
            Course Registration
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      )}
    </div>
  );
}
