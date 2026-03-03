import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexto/auth';
import RutaProtegida from './componentes/rutaProtegida';
import BarraNavegacion from './componentes/diseno/barraNav';
import Login from './paginas/auth/login';
import Register from './paginas/auth/register';
import PaginaInicio from './paginas/paginaInicio';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <BarraNavegacion /> {/* Aquí es donde se usa el componente que fallaba */}
        <Routes>
          <Route path="/" element={<h1>Página de Inicio</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<RutaProtegida rolesPermitidos={['Viatger', 'Creador', 'Admin']} />}>
            <Route path="/paginaInicio" element={<PaginaInicio />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;