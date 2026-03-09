import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Spinner, Alert, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../servicios/api';
import TarjetaViaje from '../../componentes/tarjetaViaje';
import { AuthContext } from '../../contexto/auth';

const ListaViajes = () => {
  const [viajes, setViajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchViajes = async () => {
      try {
<<<<<<< HEAD
=======
        // En main.py: prefix="/viatge"
        // En viatge.py: router.get("/trips")
        // Ruta final: /viatge/trips
>>>>>>> 23ea7f7e067a8aa83d959981917e997777a3264e
        const respuesta = await api.get('/viatge/trips');
        setViajes(respuesta.data);
      } catch (err) {
        setError('Error al cargar los viajes. Asegúrate de estar logueado.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchViajes();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando viajes...</p>
      </div>
    );
  }

  const mostrarBotonCrear = usuario && (usuario.role === 'Creador' || usuario.role === 'Admin');

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Explorar Viajes</h2>
        {mostrarBotonCrear && (
          <Button variant="success" onClick={() => navigate('/trips/create')}>
            + Crear Nuevo Viaje
          </Button>
        )}
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      
      {viajes.length === 0 && !error ? (
        <Alert variant="info">No hay viajes disponibles en este momento.</Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {viajes.map((viaje) => (
            <Col key={viaje.id}>
              <TarjetaViaje viaje={viaje} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ListaViajes;