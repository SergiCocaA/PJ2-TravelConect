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
      const res = await api.get('/admin/peticions');
      setPeticions(res.data);
    } catch (err) {
      setError('Error al cargar peticiones.');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      // action can be 'aprova' or 'denega'
      await api.post(`/admin/peticions/${id}/${action}`);
      alert(`Petición ${action === 'aprova' ? 'aprobada' : 'denegada'} con éxito.`);
      setPeticions(peticions.filter(p => p.id !== id));
    } catch (err) {
      alert(`Error al procesar la petición.`);
    }
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <Container className="py-4">
      <h2 className="mb-4">Gestión de Peticiones (Ser Creador)</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      
      {peticions.length === 0 ? (
          <Alert variant="info">No hay peticiones pendientes.</Alert>
      ) : (
          <Table striped bordered hover responsive shadow-sm>
            <thead className="table-dark">
              <tr>
                <th>Usuario</th>
                <th>Mensaje / Justificación</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {peticions.map(p => (
                <tr key={p.id}>
                  <td>{p.usuari_username || p.usuari_id}</td>
                  <td>{p.motiu}</td>
                  <td>{new Date(p.data_peticio).toLocaleDateString()}</td>
                  <td>
                    <Button variant="success" size="sm" onClick={() => handleAction(p.id, 'aprova')}>Aprobar</Button>
                    {' '}
                    <Button variant="danger" size="sm" onClick={() => handleAction(p.id, 'denega')}>Denegar</Button>
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