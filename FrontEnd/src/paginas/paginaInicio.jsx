import React, { useContext } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexto/auth';

const PaginaInicio = () => {
  const { usuario } = useContext(AuthContext);

  return (
    <div className="homepage">
      <section className="py-5 text-center bg-light rounded shadow-sm">
        <Container>
          <Row className="py-lg-5">
            <Col lg={8} md={10} className="mx-auto">
              <h1 className="display-3 fw-bold mb-4">Conecta con el Mundo</h1>
              <h1 className="display-3 fw-bold mb-4">Con un click</h1>
              <p className="lead text-muted mb-4">
                Únete a la comunidad de viajeros más apasionada.
              </p>
              <p className="lead text-muted mb-5">
                Crea aventuras inolvidables.
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
    </div>
  );
};

export default PaginaInicio;