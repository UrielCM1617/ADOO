import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Registro from './pages/Registro';
import Login from './pages/Login';
import Reservar from './pages/Reservar';
import Home from './pages/Home';
import logoVuelos from './assets/Logo.png';

function App() {
  const [nombreUsuario, setNombreUsuario] = useState(null);

  useEffect(() => {
    const guardado = localStorage.getItem('usuarioNombre');
    if (guardado) setNombreUsuario(guardado);
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioNombre');
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('vueloRespaldo');
    setNombreUsuario(null);
    window.location.href = "/";
  };

  return (
    <Router>
      <div className="app-shell">
        <nav className="navbar">
          <div className="navbar-left">
            <Link to="/" className="brand">
              <img src={logoVuelos} alt="Logo Sistema de Vuelos" className="brand-logo" />
              <div>
                <div className="brand-title">Patlani-vuelos </div>
                <div className="brand-subtitle">Inspiración prehispánica • interfaz moderna</div>
              </div>
            </Link>
          </div>

          <div className="navbar-right">
            {nombreUsuario ? (
              <div className="user-box">
                <span className="welcome-text">Hola, {nombreUsuario}</span>
                <button onClick={cerrarSesion} className="btn btn-outline">
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <div className="nav-links">
                <Link to="/login" className="nav-link">Iniciar sesión</Link>
                <Link to="/registro" className="btn btn-primary">Registrarse</Link>
              </div>
            )}
          </div>
        </nav>

        <main className="page-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reservar" element={<Reservar />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;