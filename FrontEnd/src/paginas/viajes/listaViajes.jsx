import React, { useState, useEffect } from 'react';
import { Row, Col, Spinner, Alert, Container } from 'react-bootstrap';
import api from '../../servicios/api';
import TarjetaViaje from '../../componentes/tarjetaViaje';

const ListaViajes = () => {
  const [viajes, setViajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchViajes = async () => {
      try {
        // En main.py: prefix="/viatge"
        // En viatge.py: router.get("/trips")
        // Ruta final: /viatge/trips
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

  return (
    <Container>
      <h2 className="mb-4">Explorar Viajes</h2>
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