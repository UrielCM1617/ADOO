import React, { useState } from 'react';
import usuarioService from '../services/usuarioService';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    password: ''
  });

  const manejarCambio = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  const enviarRegistro = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await usuarioService.registrarUsuario(usuario);

      if (respuesta.status === 200 || respuesta.status === 201) {
        alert("¡Registro exitoso! Los datos se guardaron en PostgreSQL.");
        navigate('/login');
      }
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      alert("Error: No se pudo guardar el usuario. ¿Está corriendo el Backend?");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-top-mark">✦</div>
        <h2>Crear cuenta</h2>
        <p className="auth-subtitle">Regístrate para reservar vuelos dentro del sistema.</p>

        <form onSubmit={enviarRegistro}>
          <div className="field-group">
            <label>Nombre completo</label>
            <input
              type="text"
              name="nombre"
              className="input-control"
              value={usuario.nombre}
              onChange={manejarCambio}
              required
            />
          </div>

          <div className="field-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              name="email"
              className="input-control"
              value={usuario.email}
              onChange={manejarCambio}
              required
            />
          </div>

          <div className="field-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              className="input-control"
              value={usuario.password}
              onChange={manejarCambio}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary full-width">
            Guardar registro
          </button>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn btn-outline full-width top-space"
          >
            Volver al inicio
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registro;