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
      setError('Error al cargar usuarios.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await api.delete(`/admin/users/${id}`);
        setUsuarios(usuarios.filter(u => u.id !== id));
      } catch (err) {
        alert('Error al eliminar usuario.');
      }
    }
  };

  const handleChangeRole = async (id, newRole) => {
      try {
          await api.patch(`/admin/users/${id}/role`, { role: newRole });
          setUsuarios(usuarios.map(u => u.id === id ? { ...u, role: newRole } : u));
      } catch (err) {
          alert('Error al cambiar rol.');
      }
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

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
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>
                <Badge bg={u.role === 'Admin' ? 'danger' : (u.role === 'Creador' ? 'warning' : 'info')}>
                  {u.role}
                </Badge>
              </td>
              <td>
                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(u.id)}>Eliminar</Button>
                {' '}
                {u.role !== 'Admin' && (
                    <Button variant="outline-primary" size="sm" onClick={() => handleChangeRole(u.id, u.role === 'Viatger' ? 'Creador' : 'Viatger')}>
                        Cambiar a {u.role === 'Viatger' ? 'Creador' : 'Viatger'}
                    </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default GestioUsuaris;