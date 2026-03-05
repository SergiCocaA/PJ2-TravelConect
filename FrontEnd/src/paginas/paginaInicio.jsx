import React, { useContext } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexto/auth';

const PaginaInicio = () => {
  const { usuario } = useContext(AuthContext);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="py-5 text-center bg-light mb-5 rounded shadow-sm">
        <Container>
          <Row className="py-lg-5">
            <Col lg={8} md={10} className="mx-auto">
              <h1 className="display-3 fw-bold mb-4">Conecta con el Mundo</h1>
              <p className="lead text-muted mb-5">
                Únete a la comunidad de viajeros más apasionada. Crea aventuras inolvidables o apúntate a experiencias diseñadas por expertos.
              </p>
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                {!usuario ? (
                  <>
                    <Button as={Link} to="/register" variant="primary" size="lg" className="px-4 gap-3">
                      Comenzar Ahora
                    </Button>
                    <Button as={Link} to="/login" variant="outline-secondary" size="lg" className="px-4">
                      Iniciar Sesión
                    </Button>
                  </>
                ) : (
                  <Button as={Link} to="/dashboard" variant="primary" size="lg" className="px-4">
                    Ir al Dashboard
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <Container className="mb-5">
        <Row className="g-4 text-center">
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm p-3">
              <Card.Body>
                <div className="feature-icon bg-primary bg-gradient text-white mb-3 rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                  ✈️
                </div>
                <h3>Explora</h3>
                <p className="text-muted">Descubre destinos únicos y experiencias diseñadas para todo tipo de viajeros.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm p-3">
              <Card.Body>
                <div className="feature-icon bg-success bg-gradient text-white mb-3 rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                  🤝
                </div>
                <h3>Conecta</h3>
                <p className="text-muted">Conoce a personas con tus mismos intereses y comparte momentos inolvidables.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm p-3">
              <Card.Body>
                <div className="feature-icon bg-warning bg-gradient text-white mb-3 rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                  🎨
                </div>
                <h3>Crea</h3>
                <p className="text-muted">¿Eres un experto? Solicita ser Creador y empieza a organizar tus propios viajes.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PaginaInicio;