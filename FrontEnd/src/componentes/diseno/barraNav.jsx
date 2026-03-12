import React, { useContext } from 'react';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexto/auth';
import logo from '../../assets/logo.png';

const BarraNavegacion = () => {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={logo}
            width="86"
            height="73"
            className="d-inline-block align-top me-2"
            alt="Logo click click"
          />
          TravelConnect
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/homepage">Inicio</Nav.Link>

            {usuario && (
              <>
                <Nav.Link as={Link} to="/dashboard">Explorar Viajes</Nav.Link>

                {usuario.role === 'Viatger' && (
                  <Nav.Link as={Link} to="/promotion">Ser Creador</Nav.Link>
                )}

                {(usuario.role === 'Creador' || usuario.role === 'Admin') && (
                  <Nav.Link as={Link} to="/trips/create">Crear Viaje</Nav.Link>
                )}

                {usuario.role === 'Admin' && (
                  <NavDropdown title="Administración" id="admin-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/admin/users">Gestión Usuarios</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/requests">Gestión Peticiones</NavDropdown.Item>
                  </NavDropdown>
                )}
              </>
            )}
          </Nav>

          <Nav>
            {usuario ? (
              <NavDropdown title={`Hola, ${usuario.username}`} id="user-nav-dropdown">
                <NavDropdown.Item as={Link} to="/profile">Mi Perfil</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Cerrar Sesión</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
                <Button as={Link} to="/register" variant="outline-light" className="ms-lg-2">Registrarse</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BarraNavegacion;