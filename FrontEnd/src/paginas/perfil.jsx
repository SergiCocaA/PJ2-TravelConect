import React, { useContext } from 'react';
import { Container, Card, Row, Col, ListGroup, Badge } from 'react-bootstrap';
import { AuthContext } from '../contexto/auth';

const Perfil = () => {
  const { usuario } = useContext(AuthContext);

  if (!usuario) return null;

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-primary text-white py-4 text-center">
              <div className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                👤
              </div>
              <h2 className="mb-0">{usuario.username}</h2>
              <Badge bg="light" text="dark" className="mt-2">{usuario.role}</Badge>
            </Card.Header>
            <Card.Body className="p-4">
              <h4 className="mb-4">Información de la Cuenta</h4>
              <ListGroup variant="flush">
                <ListGroup.Item className="py-3 px-0">
                  <Row>
                    <Col xs={4} className="text-muted fw-bold">ID de Usuario</Col>
                    <Col xs={8}>{usuario.id}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="py-3 px-0">
                  <Row>
                    <Col xs={4} className="text-muted fw-bold">Nombre de Usuario</Col>
                    <Col xs={8}>{usuario.username}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="py-3 px-0">
                  <Row>
                    <Col xs={4} className="text-muted fw-bold">Rol Actual</Col>
                    <Col xs={8}>
                      <Badge bg={usuario.role === 'Admin' ? 'danger' : (usuario.role === 'Creador' ? 'warning' : 'info')}>
                        {usuario.role}
                      </Badge>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Perfil;