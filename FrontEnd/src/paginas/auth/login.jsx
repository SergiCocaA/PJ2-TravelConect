import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexto/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación según tus apuntes (luego lo conectaremos a FastAPI)
    const usuarioSimulado = { email, rol: 'Admin', nombre: 'Ivan' };
    login(usuarioSimulado);
    navigate('/dashboard');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;