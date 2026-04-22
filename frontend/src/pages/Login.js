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

        localStorage.setItem('usuarioNombre', respuesta.data.nombre);
        localStorage.setItem('usuarioId', respuesta.data.idUsuario || respuesta.data.id);

        navigate('/');
      }
    } catch (error) {
      console.error("Error en login:", error);
      alert("Credenciales incorrectas. Revisa tu correo o contraseña.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card frame-login">
        <div className="auth-top-mark">✦</div>
        <h2>Iniciar sesión</h2>
        <p className="auth-subtitle">Accede a tu cuenta para administrar tus reservaciones.</p>

        <form onSubmit={manejarLogin}>
          <div className="field-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              className="input-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field-group">
            <label>Contraseña</label>
            <input
              type="password"
              className="input-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary full-width">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;