import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexto/auth';

const RutaProtegida = ({ rolesPermitidos }) => {
  const { usuario } = useContext(AuthContext);

  // 1. Si no hay usuario, mandamos al login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // 2. Si el rol no coincide, mandamos a la raíz
  if (rolesPermitidos && !rolesPermitidos.includes(usuario.rol)) {
    return <Navigate to="/" replace />;
  }

  // 3. ¡IMPORTANTE! Outlet es lo que dibuja la página hija
  return <Outlet />;
};

export default RutaProtegida;