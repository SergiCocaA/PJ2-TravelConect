import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import api from '../servicios/api';
import { useNavigate } from 'react-router-dom';

const FormularioPeti = () => {
  const [motiu, setMotiu] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await api.post('/promotion', { motiu });
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 3000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al enviar la petición.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Container className="mt-5">
        <Alert variant="success">
          <h4>¡Petición enviada!</h4>
          <p>Un administrador revisará tu petición pronto. Serás redirigido al dashboard en unos segundos.</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Card className="shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
        <Card.Body className="p-4">
          <h2 className="mb-4">Solicitud para ser Creador</h2>
          <p className="text-muted">Cuéntanos por qué quieres ser creador de viajes y qué tipo de experiencias te gustaría ofrecer.</p>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label>Justificación / Motivación</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={6} 
                value={motiu} 
                onChange={(e) => setMotiu(e.target.value)} 
                required 
                placeholder="Escribe aquí tus razones..."
              />
            </Form.Group>
            
            <Button variant="primary" type="submit" className="w-100 py-2" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Solicitud'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FormularioPeti;