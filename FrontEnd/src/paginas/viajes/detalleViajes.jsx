import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image, Badge, Button, Spinner, Alert, Card, ListGroup } from 'react-bootstrap';
import api from '../../servicios/api';
import { AuthContext } from '../../contexto/auth';

const DetalleViaje = () => {
  const { id } = useParams();
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();
  const [viaje, setViaje] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // En main.py: prefix="/viatge"
        // En viatge.py: router.get("/trips/{id}")
        const res = await api.get(`/viatge/trips/${id}`);
        setViaje(res.data);
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
      // Ruta final: /viatge/trips/{id}/enroll
      await api.post(`/viatge/trips/${id}/enroll`);
      setIsEnrolled(true);
      alert('¡Te has inscrito con éxito!');
    } catch (err) {
      alert(err.response?.data?.detail || 'Error al inscribirse.');
    }
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  if (error) return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>;
  if (!viaje) return null;

  const canEdit = usuario && (usuario.role === 'Admin' || (usuario.role === 'Creador' && viaje.creador_id === usuario.id));

  return (
    <Container className="mb-5">
      <Row className="mb-4">
        <Col lg={8}>
          <h1 className="mb-3">{viaje.titol}</h1>
          <div className="d-flex gap-2 mb-3">
            <Badge bg="info">{viaje.destinacio}</Badge>
            <Badge bg="success">{viaje.preu}€</Badge>
            <Badge bg="secondary">{new Date(viaje.data_inici).toLocaleDateString()} - {new Date(viaje.data_final).toLocaleDateString()}</Badge>
          </div>
          
          {viaje.imagen_url && (
            <Image src={viaje.imagen_url} fluid className="rounded mb-4 shadow-sm w-100" style={{ maxHeight: '400px', objectFit: 'cover' }} />
          )}
          
          <h3>Descripción</h3>
          <p className="lead">{viaje.descripcio}</p>
        </Col>
        
        <Col lg={4}>
          <Card className="shadow-sm sticky-top" style={{ top: '80px' }}>
            <Card.Body>
              <h4 className="mb-3 text-center">Acciones</h4>
              
              {usuario?.role === 'Viatger' && (
                <>
                  {!isEnrolled ? (
                    <Button variant="primary" size="lg" className="w-100 mb-3" onClick={handleEnroll}>
                      ¡Inscribirse ahora!
                    </Button>
                  ) : (
                    <Alert variant="success" className="text-center">
                      ¡Ya estás inscrito! 🎉
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
                <p>Capacidad: {viaje.capacitat} personas</p>
                <p>Destino: {viaje.destinacio}</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DetalleViaje;