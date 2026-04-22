import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Registro from './pages/Registro';
import Login from './pages/Login';
import Reservar from './pages/Reservar';
import Home from './pages/Home'; // Importamos el componente desde su archivo
import axios from 'axios';

function App() {
  const [nombreUsuario, setNombreUsuario] = useState(null);

  useEffect(() => {
    const guardado = localStorage.getItem('usuarioNombre');
    if (guardado) setNombreUsuario(guardado);
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioNombre');
    localStorage.removeItem('usuarioId');
    setNombreUsuario(null);
    window.location.href = "/";
  };

  return (
    <Router>
      <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
        <nav style={navStyle}>
          <Link to="/" style={logoStyle}>UAM Vuelos</Link>
          <div>
            {nombreUsuario ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontWeight: 'bold' }}>Hola, {nombreUsuario}</span>
                <button onClick={cerrarSesion} style={btnCerrarStyle}>Cerrar Sesión</button>
              </div>
            ) : (
              <>
                <Link to="/login" style={linkStyle}>Iniciar Sesión</Link>
                <Link to="/registro" style={linkStyle}>Registrarse</Link>
              </>
            )}
          </div>
        </nav>

        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reservar" element={<Reservar />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Estilos globales del Navbar
const navStyle = { display: 'flex', justifyContent: 'space-between', padding: '15px 50px', backgroundColor: '#fff', borderBottom: '3px solid #B31010' };
const logoStyle = { fontSize: '1.5rem', fontWeight: 'bold', color: '#333', textDecoration: 'none' };
const linkStyle = { marginLeft: '20px', textDecoration: 'none', color: '#333', fontWeight: 'bold' };
const btnCerrarStyle = { padding: '5px 10px', cursor: 'pointer', border: '1px solid #ccc', background: 'none', borderRadius: '4px' };

export default App;