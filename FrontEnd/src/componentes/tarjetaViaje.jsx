import React, { useContext } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexto/auth';

const TarjetaViaje = ({ viaje }) => {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);

  const puedeEditar = usuario && (usuario.role === 'Admin' || (usuario.role === 'Creador' && viaje.creador_id === usuario.id));

  return (
    <Card className="h-100 shadow-sm hover-shadow transition-all">
      {viaje.imagen_url && (
        <Card.Img variant="top" src={viaje.imagen_url} alt={viaje.nom} style={{ height: '200px', objectFit: 'cover' }} />
      )}
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="mb-0">{viaje.nom}</Card.Title>
          <div className="d-flex flex-column align-items-end gap-1">
            {viaje.preu && <Badge bg="success">{viaje.preu}€</Badge>}
            {viaje.estat && (
              <Badge bg={viaje.estat === 'Actiu' ? 'success' : 'secondary'}>
                {viaje.estat}
              </Badge>
            )}
          </div>
        </div>
        
        <Card.Text className="text-muted small mb-3">
          {viaje.descripcio?.substring(0, 100)}
          {viaje.descripcio?.length > 100 ? '...' : ''}
        </Card.Text>
        
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3 text-secondary small">
            <span>📅 {viaje.data_inici}</span>
            <span>📍 {viaje.desti}</span>
          </div>
          <div className="d-flex gap-2">
            <Button 
              variant="outline-primary" 
              className="flex-grow-1" 
              onClick={() => navigate(`/trips/${viaje.id}`)}
            >
              Ver Detalles
            </Button>
            {puedeEditar && (
              <Button 
                variant="outline-warning" 
                onClick={() => navigate(`/trips/${viaje.id}/edit`)}
              >
                ✏️
              </Button>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TarjetaViaje;