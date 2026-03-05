import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../servicios/api';
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    rol: 'Viatger' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // El backend espera: full_name, email, password, rol (opcional, por defecto Viatger)
      await api.post('/auth/register', formData);
      alert('Registro con éxito. Ahora puedes iniciar sesión.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al registrar el usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={5}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Crear Cuenta</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre Completo</Form.Label>
                  <Form.Control 
                    name="full_name" 
                    placeholder="Ej: Juan Pérez" 
                    value={formData.full_name}
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control 
                    name="email" 
                    type="email" 
                    placeholder="Introduce tu email" 
                    value={formData.email}
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control 
                    name="password" 
                    type="password" 
                    placeholder="Mínimo 6 caracteres" 
                    value={formData.password}
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mb-3" disabled={loading}>
                  {loading ? 'Registrando...' : 'Registrarse'}
                </Button>
              </Form>
              
              <div className="text-center mt-3">
                ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;