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

  // Estilos básicos para que no se vea "vacío"
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    backgroundColor: '#2c3e50',
    color: 'white',
    height: '60px'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    marginRight: '15px',
    fontWeight: 'bold'
  };

  return (
    <nav style={navStyle}>
      <div>
        {/* Enlace a la página de inicio pública */}
        <Link to="/" style={linkStyle}>Inicio</Link>

        {/* Solo mostrar Dashboard si el usuario está logueado */}
        {usuario && (
          <Link to="/paginaInicio" style={linkStyle}>Viajes</Link>
        )}
      </div>

      <div>
        {!usuario ? (
          <>
            {/* Estos son los enlaces que te faltaban en el frontend */}
            <Link to="/login" style={linkStyle}>Iniciar Sesión</Link>
            <Link to="/register" style={linkStyle}>Registrarse</Link>
          </>
        ) : (
          <>
            <span style={{ marginRight: '10px' }}> {usuario.nombre}</span>
            {usuario.rol === 'Admin' && (
              <Link to="/admin" style={linkStyle}>Panel Admin</Link>
            )}
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              Cerrar Sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default BarraNavegacion;