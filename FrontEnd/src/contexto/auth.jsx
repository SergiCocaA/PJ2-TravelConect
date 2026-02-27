import React, { createContext, useState } from 'react';

// Creamos el contexto
export const AuthContext = createContext();

// Creamos el proveedor
export const AuthProvider = ({ children }) => {
  // Estado inicial: null (no logueado)
  const [usuario, setUsuario] = useState(null);

  const login = (datos) => setUsuario(datos);
  const logout = () => setUsuario(null);

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};