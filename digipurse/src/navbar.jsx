import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

const MyNavbar = () => {
  return (
    <div className="w-1/2"> {/* Wrapping div to control width */}
      <Navbar
        bg="light"
        expand="lg"
        className="fixed top-3 left-0 p-2 z-50 shadow-md rounded-r-lg"
      >
        <Container fluid className="px-4">
          <Navbar.Brand href="#" className="font-bold text-xl">Digipurse</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="https://www.quicknode.com/guides/solana-development/spl-tokens/how-to-transfer-spl-tokens-on-solana">Doc</Nav.Link>
              <NavDropdown title="Dropdown" id="navbarScrollingDropdown">
                <NavDropdown.Item href="https://solflare.com/">Solflare </NavDropdown.Item>
                <NavDropdown.Item href="#"></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="https://github.com/lalitcap23">follow on</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link disabled>something interesting, i will write here..</Nav.Link>
            </Nav>
            <Form className="d-flex gap-2">
              <FormControl
                type="search"
                placeholder="Search"
                aria-label="Search"
                className="w-40"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default MyNavbar;