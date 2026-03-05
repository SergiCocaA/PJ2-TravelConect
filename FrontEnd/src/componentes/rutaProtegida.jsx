import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexto/auth';

const RutaProtegida = ({ rolesPermitidos }) => {
  const { usuario, cargando } = useContext(AuthContext);

  if (cargando) {
    return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  // 1. Si no hay usuario, mandamos al login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // 2. Si el rol no coincide, mandamos a la raíz
  if (rolesPermitidos && !rolesPermitidos.includes(usuario.role)) {
    return <Navigate to="/" replace />;
  }

  // 3. ¡IMPORTANTE! Outlet es lo que dibuja la página hija
  return <Outlet />;
};

export default RutaProtegida;