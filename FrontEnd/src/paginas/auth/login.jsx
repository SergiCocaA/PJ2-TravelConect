import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexto/auth';
import api from '../../servicios/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Enviamos credenciales al backend
      // El endpoint /login debe existir en tu FastAPI
      const respuesta = await api.post('/login', { email, password });

      // 2. Si es correcto, el backend devuelve los datos del usuario
      // Guardamos el usuario en el Contexto Global
      login(respuesta.data.user); 
      
      // Guardamos el token (JWT) para no perder la sesión al recargar
      localStorage.setItem('token', respuesta.data.token);

      // 3. ¡Redirigimos a tu página de inicio!
      navigate('/paginaInicio'); 
    } catch (err) {
      // Si el backend devuelve error (401 o 404), mostramos el mensaje
      setError('Email o contraseña incorrectos');
    }
  };

  return (
    <div style={{ color: 'white', padding: '40px', maxWidth: '350px', margin: 'auto' }}>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: '#ff4d4d', fontWeight: 'bold' }}>{error}</p>}
      
      <form onSubmit={manejarEnvio} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="email" 
          placeholder="Correo electrónico" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: '10px' }}
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#3498db', color: 'white', border: 'none', cursor: 'pointer' }}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;