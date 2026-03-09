import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TarjetaViaje = ({ viaje }) => {
  const navigate = useNavigate();

  return (
    <Card className="h-100 shadow-sm hover-shadow transition-all">
      {viaje.imagen_url && (
        <Card.Img variant="top" src={viaje.imagen_url} alt={viaje.nom} style={{ height: '200px', objectFit: 'cover' }} />
      )}
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          {/* El backend usa 'nom' en lugar de 'titol' */}
          <Card.Title className="mb-0">{viaje.nom}</Card.Title>
          <Badge bg="success">{viaje.preu || 'N/A'}€</Badge>
        </div>
        
        <Card.Text className="text-muted small mb-3">
          {viaje.descripcio?.substring(0, 100)}
          {viaje.descripcio?.length > 100 ? '...' : ''}
        </Card.Text>
        
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3 text-secondary small">
            <span>📅 {viaje.data_inici ? new Date(viaje.data_inici).toLocaleDateString() : 'TBD'}</span>
            {/* El backend usa 'desti' en lugar de 'destinacio' */}
            <span>📍 {viaje.desti}</span>
          </div>
          <Button 
            variant="outline-primary" 
            className="w-100" 
            onClick={() => navigate(`/trips/${viaje.id}`)}
          >
            Ver Detalles
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TarjetaViaje;