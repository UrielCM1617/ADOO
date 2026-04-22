import React, { useState } from 'react';
import usuarioService from '../services/usuarioService';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const manejarLogin = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await usuarioService.loginUsuario(email, password);
      
      if (respuesta.status === 200) {
        alert(`Bienvenido de nuevo, ${respuesta.data.nombre}`);
        
        // GUARDAR DATOS EN LOCALSTORAGE
        localStorage.setItem('usuarioNombre', respuesta.data.nombre);
        // Guardamos el ID del usuario para las reservas (ajusta idUsuario según tu modelo backend)
        localStorage.setItem('usuarioId', respuesta.data.idUsuario || respuesta.data.id); 
        
        navigate('/'); 
      }
    } catch (error) {
      console.error("Error en login:", error);
      alert("Credenciales incorrectas. Revisa tu correo o contraseña.");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ color: '#B31010', textAlign: 'center' }}>Inicio de Sesión UAM</h2>
        <form onSubmit={manejarLogin}>
          <div style={inputGroup}>
            <label>Correo electrónico:</label>
            <input 
              type="email" 
              style={inputStyle} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div style={inputGroup}>
            <label>Contraseña:</label>
            <input 
              type="password" 
              style={inputStyle} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" style={btnStyle}>Entrar</button>
        </form>
      </div>
    </div>
  );
}

const containerStyle = { display: 'flex', justifyContent: 'center', marginTop: '50px' };
const cardStyle = { border: '2px solid #333', padding: '30px', borderRadius: '8px', width: '300px', backgroundColor: '#fff' };
const inputGroup = { marginBottom: '15px', textAlign: 'left' };
const inputStyle = { width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' };
const btnStyle = { width: '100%', padding: '10px', backgroundColor: '#333', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' };

export default Login;