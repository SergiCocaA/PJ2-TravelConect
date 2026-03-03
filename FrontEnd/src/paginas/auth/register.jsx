import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'Viatger' // Valor por defecto según tus modelos
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ajusta la URL a tu endpoint de FastAPI (ej: http://localhost:8000/users)
      await axios.post('http://localhost:8000/users', formData);
      alert('Registro con éxito. Ahora puedes iniciar sesión.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al registrar el usuario');
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Crear Cuenta</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          name="nombre" 
          placeholder="Nombre completo" 
          onChange={handleChange} 
          required 
          style={{ padding: '8px' }}
        />
        <input 
          name="email" 
          type="email" 
          placeholder="Correo electrónico" 
          onChange={handleChange} 
          required 
          style={{ padding: '8px' }}
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Contraseña" 
          onChange={handleChange} 
          required 
          style={{ padding: '8px' }}
        />

        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
          Registrarse
        </button>
      </form>
      
      <p style={{ marginTop: '15px' }}>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
      </p>
    </div>
  );
};

export default Register;