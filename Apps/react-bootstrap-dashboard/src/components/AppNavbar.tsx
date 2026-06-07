'use client';

import { Container, Nav, Navbar } from 'react-bootstrap';

export default function AppNavbar() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container fluid>
        <Navbar.Brand href="#">Course Scheduler</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link href="#">Dashboard</Nav.Link>
            <Nav.Link href="#">Schedules</Nav.Link>
            <Nav.Link href="#">Lecturers</Nav.Link>
            <Nav.Link href="#">Settings</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}