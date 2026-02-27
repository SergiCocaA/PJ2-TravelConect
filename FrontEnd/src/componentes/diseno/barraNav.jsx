import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexto/auth';

const BarraNavegacion = () => {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '1rem', 
      backgroundColor: '#333', 
      color: 'white' 
    }}>
      <div>
        <Link to="/" style={{ color: 'white', marginRight: '10px' }}>Inicio</Link>
        {usuario && <Link to="/dashboard" style={{ color: 'white' }}>Dashboard</Link>}
      </div>
      <div>
        {usuario ? (
          <>
            <span style={{ marginRight: '10px' }}>Hola, {usuario.nombre}</span>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </>
        ) : (
          <Link to="/login" style={{ color: 'white' }}>Iniciar Sesión</Link>
        )}
      </div>
    </nav>
  );
};

export default BarraNavegacion;