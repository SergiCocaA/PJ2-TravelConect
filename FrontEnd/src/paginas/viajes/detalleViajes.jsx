import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image, Badge, Button, Spinner, Alert, Card, ListGroup, Nav, Tab } from 'react-bootstrap';
import api from '../../servicios/api';
import { AuthContext } from '../../contexto/auth';
import TripChat from '../../componentes/TripChat';

const DetalleViaje = () => {
  const { id } = useParams();
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();
  const [viaje, setViaje] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/viatge/trips/${id}`);
        setViaje(res.data);

        // Verificar si el usuario está inscrito
        if (usuario && res.data.participants) {
          const enrolled = res.data.participants.some(p => p.id === parseInt(usuario.id));
          setIsEnrolled(enrolled);
        }
      } catch (err) {
        setError('No se pudo cargar la información del viaje.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, usuario]);

  const handleEnroll = async () => {
    try {
      await api.post(`/viatge/trips/${id}/enroll`);
      setIsEnrolled(true);
      alert('¡Te has inscrito con éxito!');
      // Recargar datos para actualizar la lista de participantes si es necesario
      const res = await api.get(`/viatge/trips/${id}`);
      setViaje(res.data);
    } catch (err) {
      alert(err.response?.data?.detail || 'Error al inscribirse.');
    }
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  if (error) return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>;
  if (!viaje) return null;

  const canEdit = usuario && (usuario.role === 'Admin' || (usuario.role === 'Creador' && viaje.creador_id === usuario.id));
  const canSeeChat = usuario && (usuario.role === 'Admin' || isEnrolled);

  return (
    <Container className="mb-5">
      <Row className="mb-4">
        <Col lg={8}>
          <h1 className="mb-3">{viaje.nom}</h1>
          <div className="d-flex gap-2 mb-3">
            <Badge bg="info">{viaje.desti}</Badge>
            <Badge bg="secondary">{viaje.data_inici} - {viaje.data_fi}</Badge>
            <Badge bg={viaje.estat === 'Actiu' ? 'success' : 'secondary'}>{viaje.estat}</Badge>
          </div>

          <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
            <Nav variant="tabs" className="mb-4">
              <Nav.Item>
                <Nav.Link eventKey="info">Información</Nav.Link>
              </Nav.Item>
              {canSeeChat && (
                <Nav.Item>
                  <Nav.Link eventKey="chat"> Chat del Grupo</Nav.Link>
                </Nav.Item>
              )}
            </Nav>

            <Tab.Content>
              <Tab.Pane eventKey="info">
                {viaje.imagen_url && (
                  <Image src={viaje.imagen_url} fluid className="rounded mb-4 shadow-sm w-100" style={{ maxHeight: '400px', objectFit: 'cover' }} />
                )}

                <h3>Descripción</h3>
                <p className="lead">{viaje.descripcio}</p>

                <div className="mt-4">
                  <h5>Información del viaje:</h5>
                  <ListGroup variant="flush">
                    <ListGroup.Item>📍 <strong>Destino:</strong> {viaje.desti}</ListGroup.Item>
                    <ListGroup.Item>📅 <strong>Inicio:</strong> {viaje.data_inici}</ListGroup.Item>
                    <ListGroup.Item>📅 <strong>Fin:</strong> {viaje.data_fi}</ListGroup.Item>
                    <ListGroup.Item>👥 <strong>Participantes:</strong> {viaje.participants?.length || 0} / {viaje.maxim_participants}</ListGroup.Item>
                  </ListGroup>
                </div>
              </Tab.Pane>

              {canSeeChat && (
                <Tab.Pane eventKey="chat">
                  <TripChat tripId={id} usuario={usuario} />
                </Tab.Pane>
              )}
            </Tab.Content>
          </Tab.Container>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm sticky-top" style={{ top: '80px' }}>
            <Card.Body>
              <h4 className="mb-3 text-center">Acciones</h4>

              {usuario && usuario.role === 'Viatger' && (
                <>
                  {!isEnrolled ? (
                    <Button variant="primary" size="lg" className="w-100 mb-3" onClick={handleEnroll}>
                      Inscribirse ahora
                    </Button>
                  ) : (
                    <Alert variant="success" className="text-center">
                      Inscrito
                    </Alert>
                  )}
                </>
              )}

              {canEdit && (
                <Button variant="warning" size="lg" className="w-100 mb-3" onClick={() => navigate(`/trips/${id}/edit`)}>
                  Editar Viaje
                </Button>
              )}

              <hr />
              <div className="text-muted small">
                <p>Capacidad: {viaje.maxim_participants} personas</p>
                <p>Inscritos: {viaje.participants?.length || 0}</p>
                <p>Destino: {viaje.desti}</p>
                <p>Estado: {viaje.estat}</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DetalleViaje;