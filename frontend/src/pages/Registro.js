import React, { useState } from 'react';
import usuarioService from '../services/usuarioService'; // Asegúrate de crear este archivo después
import { useNavigate } from 'react-router-dom';

function Registro() {
  const navigate = useNavigate();
  
  // Estado inicial con los campos mínimos que pediste
  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    password: ''
  });

  // Función para capturar lo que escribes en cada input
  const manejarCambio = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  // Función para enviar el paquete JSON al Backend
  const enviarRegistro = async (e) => {
    e.preventDefault();
    
    try {
      console.log("Preparando JSON para enviar a la UAM:", usuario);
      
      // Llamada al servicio de Axios
      const respuesta = await usuarioService.registrarUsuario(usuario);
      
      if (respuesta.status === 200 || respuesta.status === 201) {
        alert("¡Registro exitoso! Los datos se guardaron en PostgreSQL.");
        navigate('/login'); // Te manda al login después de registrarte
      }
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      alert("Error: No se pudo guardar el usuario. ¿Está corriendo el Backend?");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ color: '#B31010', textAlign: 'center' }}>Registro UAM</h2>
        <form onSubmit={enviarRegistro}>
          
          <div style={inputGroup}>
            <label>Nombre completo:</label>
            <input 
              type="text" 
              name="nombre" 
              style={inputStyle} 
              value={usuario.nombre}
              onChange={manejarCambio} 
              required 
            />
          </div>

          <div style={inputGroup}>
            <label>Correo electrónico:</label>
            <input 
              type="email" 
              name="email" 
              style={inputStyle} 
              value={usuario.email}
              onChange={manejarCambio} 
              required 
            />
          </div>

          <div style={inputGroup}>
            <label>Contraseña:</label>
            <input 
              type="password" 
              name="password" 
              style={inputStyle} 
              value={usuario.password}
              onChange={manejarCambio} 
              required 
            />
          </div>

          <button type="submit" style={btnStyle}>
            Guardar Registro
          </button>
          
          <button 
            type="button" 
            onClick={() => navigate('/')} 
            style={{...btnStyle, backgroundColor: '#666', marginTop: '10px'}}
          >
            Volver al Inicio
          </button>
        </form>
      </div>
    </div>
  );
}

// Estilos básicos siguiendo tu diagrama
const containerStyle = { 
  display: 'flex', 
  justifyContent: 'center', 
  marginTop: '50px' 
};

const cardStyle = { 
  border: '2px solid #333', 
  padding: '30px', 
  borderRadius: '8px', 
  width: '350px',
  backgroundColor: '#fff'
};

const inputGroup = { 
  marginBottom: '15px', 
  textAlign: 'left' 
};

const inputStyle = { 
  width: '100%', 
  padding: '10px', 
  marginTop: '5px', 
  boxSizing: 'border-box',
  border: '1px solid #ccc',
  borderRadius: '4px'
};

const btnStyle = { 
  width: '100%', 
  padding: '12px', 
  backgroundColor: '#333', 
  color: 'white', 
  border: 'none', 
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

export default Registro;