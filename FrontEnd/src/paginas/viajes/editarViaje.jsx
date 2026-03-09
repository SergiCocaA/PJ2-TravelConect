import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Row, Col, Alert, Spinner } from 'react-bootstrap';
import api from '../../servicios/api';

const EditarViaje = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    descripcio: '',
    desti: '',
    data_inici: '',
    data_fi: '',
    maxim_participants: 10,
    estat: 'Planificant'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchViaje = async () => {
      try {
        const respuesta = await api.get(`/viatge/trips/${id}`);
        const viaje = respuesta.data;
        
        setFormData({
          nom: viaje.nom || '',
          descripcio: viaje.descripcio || '',
          desti: viaje.desti || '',
          data_inici: viaje.data_inici || '',
          data_fi: viaje.data_fi || '',
          maxim_participants: viaje.maxim_participants || 10,
          estat: viaje.estat || 'Planificant'
        });
      } catch (err) {
        setError('Error al cargar los datos del viaje');
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
      // Ruta final: /creadorViatges/creator/trips/{id}
      await api.put(`/creadorViatges/creator/trips/${id}`, {
        ...formData,
        maxim_participants: parseInt(formData.maxim_participants || 10)
      });
      alert('Viaje actualizado con éxito');
      navigate(`/trips/${id}`);
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al actualizar el viaje');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  return (
    <Container className="py-5">
      <Row>
        <Col md={8} lg={6} className="mx-auto">
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h2 className="mb-4 text-center">Editar Viaje</h2>
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

                <Form.Group className="mb-3">
                  <Form.Label>Destino</Form.Label>
                  <Form.Control 
                    name="desti" 
                    value={formData.desti} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>

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

                <div className="d-flex gap-2 mt-4">
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