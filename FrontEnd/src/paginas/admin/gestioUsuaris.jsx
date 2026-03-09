import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Spinner, Alert, Badge } from 'react-bootstrap';
import api from '../../servicios/api';

const GestioUsuaris = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const res = await api.get('/admin/users');
      setUsuarios(res.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setUsuarios([]);
      } else {
        setError('Error al cargar usuarios.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChangeRole = async (id, currentRole) => {
      const newRole = currentRole === 'Viatger' ? 'Creador' : 'Viatger';
      const roleDisplayName = newRole === 'Viatger' ? 'Viajero' : 'Creador';
      try {
          await api.put(`/admin/users/${id}/promote`, { new_rol: newRole });
          setUsuarios(usuarios.map(u => u.id === id ? { ...u, rol: newRole } : u));
          alert(`Rol cambiado a ${roleDisplayName} con éxito.`);
      } catch (err) {
          alert('Error al cambiar rol: ' + (err.response?.data?.detail || err.message));
      }
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  return (
    <Container className="py-4">
      <h2 className="mb-4">Gestión de Usuarios</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Table striped bordered hover responsive shadow-sm>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length === 0 ? (
            <tr><td colSpan="5" className="text-center">No hay usuarios registrados.</td></tr>
          ) : (
            usuarios.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.full_name}</td>
                <td>{u.email}</td>
                <td>
                  <Badge bg={u.rol === 'Admin' ? 'danger' : (u.rol === 'Creador' ? 'warning' : 'info')}>
                    {u.rol === 'Viatger' ? 'Viajero' : (u.rol === 'Creador' ? 'Creador' : 'Admin')}
                  </Badge>
                </td>
                <td>
                  {u.rol !== 'Admin' && (
                      <Button variant="outline-primary" size="sm" onClick={() => handleChangeRole(u.id, u.rol)}>
                          Cambiar a {u.rol === 'Viatger' ? 'Creador' : 'Viajero'}
                      </Button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default GestioUsuaris;