import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Spinner, Alert, Badge } from 'react-bootstrap';
import api from '../../servicios/api';

const GestioPeticions = () => {
  const [peticions, setPeticions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPeticions();
  }, []);

  const fetchPeticions = async () => {
    try {
      const res = await api.get('/admin/users/promotions');
      setPeticions(res.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setPeticions([]);
      } else {
        setError('Error al cargar peticiones.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      const newStatus = action === 'aprova' ? 'aprovat' : 'denegat';
      await api.put(`/admin/promotions/${id}`, { new_estado: newStatus });
      
      alert(`Petición ${action === 'aprova' ? 'aprobada' : 'denegada'} con éxito.`);
      fetchPeticions();
    } catch (err) {
      alert(`Error al procesar la petición: ` + (err.response?.data?.detail || err.message));
    }
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  return (
    <Container className="py-4">
      <h2 className="mb-4">Gestión de Peticiones (Ser Creador)</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      
      {peticions.length === 0 ? (
          <Alert variant="info">No hay peticiones de promoción en este momento.</Alert>
      ) : (
          <Table striped bordered hover responsive shadow-sm>
            <thead className="table-dark">
              <tr>
                <th>Usuario ID</th>
                <th>Mensaje / Justificación</th>
                <th>Estado Actual</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {peticions.map(p => (
                <tr key={p.id}>
                  <td>{p.usuari_solicitant}</td>
                  <td>{p.missatge_peticio}</td>
                  <td>
                      <Badge bg={p.estat === 'aprovat' ? 'success' : (p.estat === 'denegat' ? 'danger' : 'warning')}>
                          {p.estat === 'pendent' ? 'Pendiente' : (p.estat === 'aprovat' ? 'Aprobado' : 'Denegado')}
                      </Badge>
                  </td>
                  <td>
                    {p.estat === 'pendent' && (
                        <>
                            <Button variant="success" size="sm" onClick={() => handleAction(p.usuari_solicitant, 'aprova')}>Aprobar</Button>
                            {' '}
                            <Button variant="danger" size="sm" onClick={() => handleAction(p.usuari_solicitant, 'denega')}>Denegar</Button>
                        </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
      )}
    </Container>
  );
};

export default GestioPeticions;