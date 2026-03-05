import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../contexto/auth';
import api from '../../servicios/api';
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // El backend usa OAuth2PasswordRequestForm, que espera x-www-form-urlencoded
      // con los campos 'username' (que es el email) y 'password'
      const params = new URLSearchParams();
      params.append('username', email);
      params.append('password', password);

      const respuesta = await api.post('/auth/login', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      
      if (respuesta.data.access_token) {
        login(respuesta.data.access_token);
        navigate('/dashboard');
      } else {
        setError('Respuesta del servidor inválida');
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Email o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Iniciar Sesión</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={manejarEnvio}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Introduce tu email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Contraseña" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mb-3" disabled={loading}>
                  {loading ? 'Cargando...' : 'Entrar'}
                </Button>
              </Form>
              
              <div className="text-center mt-3">
                ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;