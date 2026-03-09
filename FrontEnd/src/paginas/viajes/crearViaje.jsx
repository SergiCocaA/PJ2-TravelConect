import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import api from '../../servicios/api';

const CrearViaje = () => {
  const [formData, setFormData] = useState({
    nom: '',
    descripcio: '',
    desti: '',
    data_inici: '',
    data_fi: '',
<<<<<<< HEAD
    maxim_participants: 10,
    estat: 'Planificant'
=======
    preu: '',
    maxim_participants: '',
    imagen_url: ''
>>>>>>> 23ea7f7e067a8aa83d959981917e997777a3264e
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
<<<<<<< HEAD
      await api.post('/creadorViatges/creator/trips', {
        ...formData,
        maxim_participants: parseInt(formData.maxim_participants)
=======
      // En main.py: prefix="/creadorViatges"
      // En creadorViatges.py: prefix="/creator" + router.post("/trips")
      // Ruta final: /creadorViatges/creator/trips
      await api.post('/creadorViatges/creator/trips', {
        ...formData,
        preu: parseFloat(formData.preu || 0),
        maxim_participants: parseInt(formData.maxim_participants || 10)
>>>>>>> 23ea7f7e067a8aa83d959981917e997777a3264e
      });
      alert('Viaje creado con éxito');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al crear el viaje');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row>
        <Col md={8} lg={6} className="mx-auto">
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h2 className="mb-4 text-center">Crear Nuevo Viaje</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre del Viaje</Form.Label>
                  <Form.Control 
                    name="nom" 
                    value={formData.nom} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={4} 
                    name="descripcio" 
                    value={formData.descripcio} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>

<<<<<<< HEAD
                <Form.Group className="mb-3">
                  <Form.Label>Destino</Form.Label>
                  <Form.Control 
                    name="desti" 
                    value={formData.desti} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>
=======
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Destino</Form.Label>
                      <Form.Control 
                        name="desti" 
                        value={formData.desti} 
                        onChange={handleChange} 
                        required 
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Precio (€)</Form.Label>
                      <Form.Control 
                        type="number" 
                        name="preu" 
                        value={formData.preu} 
                        onChange={handleChange} 
                      />
                    </Form.Group>
                  </Col>
                </Row>
>>>>>>> 23ea7f7e067a8aa83d959981917e997777a3264e

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Fecha Inicio</Form.Label>
                      <Form.Control 
                        type="date" 
                        name="data_inici" 
                        value={formData.data_inici} 
                        onChange={handleChange} 
                        required 
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Fecha Final</Form.Label>
                      <Form.Control 
                        type="date" 
                        name="data_fi" 
                        value={formData.data_fi} 
                        onChange={handleChange} 
                        required 
                      />
                    </Form.Group>
                  </Col>
                </Row>

<<<<<<< HEAD
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Capacidad Máxima</Form.Label>
                      <Form.Control 
                        type="number" 
                        name="maxim_participants" 
                        value={formData.maxim_participants} 
                        onChange={handleChange} 
                        required 
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Estado</Form.Label>
                      <Form.Select name="estat" value={formData.estat} onChange={handleChange}>
                        <option value="Planificant">Planificant</option>
                        <option value="Actiu">Actiu</option>
                        <option value="Complet">Complet</option>
                        <option value="Cancel·lat">Cancel·lat</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="primary" type="submit" className="w-100 mt-4 py-2" disabled={loading}>
=======
                <Form.Group className="mb-3">
                  <Form.Label>Máximo de Participantes</Form.Label>
                  <Form.Control 
                    type="number" 
                    name="maxim_participants" 
                    value={formData.maxim_participants} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>URL de la Imagen (opcional)</Form.Label>
                  <Form.Control 
                    name="imagen_url" 
                    value={formData.imagen_url} 
                    onChange={handleChange} 
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 py-2" disabled={loading}>
>>>>>>> 23ea7f7e067a8aa83d959981917e997777a3264e
                  {loading ? 'Creando...' : 'Publicar Viaje'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CrearViaje;