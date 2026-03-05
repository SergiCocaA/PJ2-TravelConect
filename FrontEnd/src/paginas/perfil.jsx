import React, { useContext, useEffect, useState } from 'react';
import { Container, Card, Row, Col, ListGroup, Badge, Spinner, Alert, Button, Form } from 'react-bootstrap';
import { AuthContext } from '../contexto/auth';
import api from '../servicios/api';

const Perfil = () => {
  const { usuario } = useContext(AuthContext);
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Estados para la edición
  const [editando, setEditando] = useState(false);
  const [nombre, setNombre] = useState('');
  const [bio, setBio] = useState('');
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const res = await api.get('/users/users/me');
        setPerfil(res.data);
        setNombre(res.data.full_name || '');
        setBio(res.data.bio || '');
      } catch (err) {
        setError('No se pudo cargar la información del perfil.');
      } finally {
        setLoading(false);
      }
    };

    if (usuario) {
      fetchPerfil();
    }
  }, [usuario]);

  const handleGuardar = async (e) => {
    e.preventDefault();
    setGuardando(true);
    try {
      // Endpoint: @router.put("/me/{nom}/{bio}") con prefijo /users/users
      await api.put(`/users/users/me/${encodeURIComponent(nombre)}/${encodeURIComponent(bio)}`);
      setPerfil({ ...perfil, full_name: nombre, bio: bio });
      setEditando(false);
      alert('Perfil actualizado con éxito');
    } catch (err) {
      alert('Error al actualizar el perfil: ' + (err.response?.data?.detail || err.message));
    } finally {
      setGuardando(false);
    }
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  if (error) return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>;
  if (!perfil) return null;

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-primary text-white py-4 text-center">
              <div className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                👤
              </div>
              <h2 className="mb-0">{perfil.full_name}</h2>
              <Badge bg="light" text="dark" className="mt-2">{perfil.rol}</Badge>
            </Card.Header>
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="mb-0">Información de la Cuenta</h4>
                  {!editando && (
                      <Button variant="outline-primary" size="sm" onClick={() => setEditando(true)}>
                          Editar Perfil
                      </Button>
                  )}
              </div>

              {editando ? (
                  <Form onSubmit={handleGuardar}>
                      <Form.Group className="mb-3">
                          <Form.Label>Nombre Completo</Form.Label>
                          <Form.Control 
                            value={nombre} 
                            onChange={(e) => setNombre(e.target.value)} 
                            required 
                          />
                      </Form.Group>
                      <Form.Group className="mb-3">
                          <Form.Label>Biografía</Form.Label>
                          <Form.Control 
                            as="textarea" 
                            rows={3} 
                            value={bio} 
                            onChange={(e) => setBio(e.target.value)} 
                          />
                      </Form.Group>
                      <div className="d-flex gap-2">
                          <Button variant="primary" type="submit" disabled={guardando}>
                              {guardando ? 'Guardando...' : 'Guardar Cambios'}
                          </Button>
                          <Button variant="secondary" onClick={() => setEditando(false)}>
                              Cancelar
                          </Button>
                      </div>
                  </Form>
              ) : (
                  <ListGroup variant="flush">
                    <ListGroup.Item className="py-3 px-0">
                      <Row>
                        <Col xs={4} className="text-muted fw-bold">Email</Col>
                        <Col xs={8}>{perfil.email}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="py-3 px-0">
                      <Row>
                        <Col xs={4} className="text-muted fw-bold">Biografía</Col>
                        <Col xs={8}>{perfil.bio || 'Sin biografía.'}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="py-3 px-0">
                      <Row>
                        <Col xs={4} className="text-muted fw-bold">Rol Actual</Col>
                        <Col xs={8}>
                          <Badge bg={perfil.rol === 'Admin' ? 'danger' : (perfil.rol === 'Creador' ? 'warning' : 'info')}>
                            {perfil.rol}
                          </Badge>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Perfil;