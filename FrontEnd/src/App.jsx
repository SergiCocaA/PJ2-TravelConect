import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexto/auth';
import RutaProtegida from './componentes/rutaProtegida';
import BarraNavegacion from './componentes/diseno/barraNav';
import Login from './paginas/auth/login';
import Register from './paginas/auth/register';
import PaginaInicio from './paginas/paginaInicio';
import Perfil from './paginas/perfil';
import ListaViajes from './paginas/viajes/listaViajes';
import DetalleViaje from './paginas/viajes/detalleViajes';
import CrearViaje from './paginas/viajes/crearViaje';
import EditarViaje from './paginas/viajes/editarViaje';
import FormularioPeti from './paginas/formularioPeti';
import GestioUsuaris from './paginas/admin/gestioUsuaris';
import GestioPeticions from './paginas/admin/gestioPeticions';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <BarraNavegacion />
        {/* Usamos main sin Container global para permitir que secciones como el Hero sean a sangre (full-width) */}
        <main className="py-4">
          <Routes>
            {/* Rutes Públiques */}
            <Route path="/homepage" element={<PaginaInicio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/homepage" />} />

            {/* Rutes Protegides (Tots els rols) */}
            <Route element={<RutaProtegida rolesPermitidos={['Viatger', 'Creador', 'Admin']} />}>
              <Route path="/dashboard" element={<ListaViajes />} />
              <Route path="/trips/:id" element={<DetalleViaje />} />
              <Route path="/profile" element={<Perfil />} />
            </Route>

            {/* Rutes Protegides (Viatger) */}
            <Route element={<RutaProtegida rolesPermitidos={['Viatger']} />}>
              <Route path="/promotion" element={<FormularioPeti />} />
            </Route>

            {/* Rutes Protegides (Creador y Admin) */}
            <Route element={<RutaProtegida rolesPermitidos={['Creador', 'Admin']} />}>
              <Route path="/trips/create" element={<CrearViaje />} />
              <Route path="/trips/:id/edit" element={<EditarViaje />} />
            </Route>

            {/* Rutes Protegides (Administrador) */}
            <Route element={<RutaProtegida rolesPermitidos={['Admin']} />}>
              <Route path="/admin/users" element={<GestioUsuaris />} />
              <Route path="/admin/requests" element={<GestioPeticions />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;