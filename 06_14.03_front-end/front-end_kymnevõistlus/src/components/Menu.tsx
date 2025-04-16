import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function BasicExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">KÜMNEVÕISTLUS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/competitors">Võistlejad</Nav.Link>
            <Nav.Link as={Link} to="/events">Võistlusalad</Nav.Link>
            <Nav.Link as={Link} to="/results">Tulemused</Nav.Link>
            <NavDropdown title="Manage">
            <NavDropdown.Item as={Link} to="/ManageCompetitors">Manage Competitors</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/ManageResults">ManageResults</NavDropdown.Item>
            </NavDropdown>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;