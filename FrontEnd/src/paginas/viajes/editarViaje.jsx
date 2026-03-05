import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Row, Col, Alert, Spinner } from 'react-bootstrap';
import api from '../../servicios/api';

const EditarViaje = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titol: '',
    descripcio: '',
    destinacio: '',
    data_inici: '',
    data_final: '',
    preu: '',
    capacitat: '',
    imagen_url: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchViaje = async () => {
      try {
        const respuesta = await api.get(`/viatge/${id}`);
        const viaje = respuesta.data;
        
        // Formatear fechas para el input de tipo date (YYYY-MM-DD)
        const formatFecha = (fechaStr) => {
          if (!fechaStr) return '';
          return new Date(fechaStr).toISOString().split('T')[0];
        };

        setFormData({
          titol: viaje.titol || '',
          descripcio: viaje.descripcio || '',
          destinacio: viaje.destinacio || '',
          data_inici: formatFecha(viaje.data_inici),
          data_final: formatFecha(viaje.data_final),
          preu: viaje.preu || '',
          capacitat: viaje.capacitat || '',
          imagen_url: viaje.imagen_url || ''
        });
      } catch (err) {
        setError('Error al cargar los datos del viaje');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchViaje();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      await api.put(`/viatge/${id}`, {
        ...formData,
        preu: parseFloat(formData.preu),
        capacitat: parseInt(formData.capacitat)
      });
      alert('Viaje actualizado con éxito');
      navigate(`/trips/${id}`);
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al actualizar el viaje');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando datos del viaje...</p>
      </div>
    );
  }

  return (
    <Container className="py-5">
      <Row justify="center">
        <Col md={8} lg={6} className="mx-auto">
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h2 className="mb-4 text-center">Editar Viaje</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Título del Viaje</Form.Label>
                  <Form.Control 
                    name="titol" 
                    value={formData.titol} 
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

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Destino</Form.Label>
                      <Form.Control 
                        name="destinacio" 
                        value={formData.destinacio} 
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
                        required 
                      />
                    </Form.Group>
                  </Col>
                </Row>

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
                        name="data_final" 
                        value={formData.data_final} 
                        onChange={handleChange} 
                        required 
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Capacidad (personas)</Form.Label>
                  <Form.Control 
                    type="number" 
                    name="capacitat" 
                    value={formData.capacitat} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>URL de la Imagen</Form.Label>
                  <Form.Control 
                    name="imagen_url" 
                    value={formData.imagen_url} 
                    onChange={handleChange} 
                  />
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button variant="secondary" className="w-50" onClick={() => navigate(-1)}>
                    Cancelar
                  </Button>
                  <Button variant="primary" type="submit" className="w-50" disabled={saving}>
                    {saving ? 'Guardando...' : 'Guardar Cambios'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditarViaje;