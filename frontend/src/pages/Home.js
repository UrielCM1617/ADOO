import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import vueloService from '../services/vueloService';
import axios from 'axios';

function Home() {
  const navigate = useNavigate();
  const [filtros, setFiltros] = useState({ origen: '', destino: '', fecha: '' });
  const [vuelos, setVuelos] = useState([]);
  const [codigoBusqueda, setCodigoBusqueda] = useState('');

  const aeropuertos = [
    { n: "MEX - CDMX" }, { n: "GDL - Guadalajara" }, { n: "MTY - Monterrey" }, 
    { n: "CUN - Cancún" }, { n: "JFK - New York" }, { n: "LAX - Los Ángeles" },
    { n: "MIA - Miami" }, { n: "ORD - Chicago" }, { n: "YYZ - Toronto" }, 
    { n: "YVR - Vancouver" }, { n: "YUL - Montreal" }, { n: "YYC - Calgary" }
  ];

  const realizarBusqueda = async () => {
    if (!filtros.origen || !filtros.destino || !filtros.fecha) {
      alert("Por favor selecciona origen, destino y fecha.");
      return;
    }
    try {
      const res = await vueloService.buscarVuelosFiltro(filtros.origen, filtros.destino, filtros.fecha);
      setVuelos(res.data);
    } catch (err) {
      alert("No se encontraron vuelos.");
    }
  };

  const consultarReserva = async () => {
    // Aplicamos .trim() para eliminar espacios y .toUpperCase() para estandarizar
    const codigoLimpio = codigoBusqueda.trim().toUpperCase();

    if (!codigoLimpio) return alert("Por favor ingresa un código.");

    try {
      const res = await axios.get(`http://localhost:8080/api/reservas/buscar/${codigoLimpio}`);
      const r = res.data;
      
      alert(`✅ Reserva Encontrada:\n\n` +
            `Pasajero: ${r.usuario.nombre}\n` +
            `Vuelo: ${r.vuelo.origen.nombre} ➡️ ${r.vuelo.destino.nombre}\n` +
            `Asiento: ${r.asiento.numero} (${r.tipoClase})\n` +
            `Estatus: ${r.estatus}\n` +
            `Total: $${r.precioTotal}`);
    } catch (err) {
      alert("No se encontró ninguna reserva con el código: " + codigoLimpio);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
        
        {/* BUSCADOR DE VUELOS */}
        <div style={boxStyle}>
          <h3 style={{ borderBottom: '2px solid #B31010', paddingBottom: '10px' }}>Buscar Vuelo 🔍</h3>
          <div style={{ textAlign: 'left', marginTop: '15px' }}>
            <label>De:</label>
            <select style={inputStyle} onChange={(e) => setFiltros({...filtros, origen: e.target.value})}>
              <option value="">Selecciona Origen</option>
              {aeropuertos.map(a => <option key={a.n} value={a.n}>{a.n}</option>)}
            </select>
            <label>A:</label>
            <select style={inputStyle} onChange={(e) => setFiltros({...filtros, destino: e.target.value})}>
              <option value="">Selecciona Destino</option>
              {aeropuertos.map(a => <option key={a.n} value={a.n}>{a.n}</option>)}
            </select>
            <label>Fecha:</label>
            <input type="date" style={inputStyle} onChange={(e) => setFiltros({...filtros, fecha: e.target.value})} />
          </div>
          <button onClick={realizarBusqueda} style={btnPrincipalStyle}>Buscar</button>
        </div>

        {/* CONSULTOR DE RESERVAS */}
        <div style={boxStyle}>
          <h3 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>Ver Reserva</h3>
          <p style={{ marginTop: '20px', color: '#666' }}>Consulta el estatus de tu viaje.</p>
          <input 
            type="text" 
            placeholder="Ej: UAM-A1B2C3" 
            style={inputStyle} 
            value={codigoBusqueda}
            onChange={(e) => setCodigoBusqueda(e.target.value)}
          />
          <button onClick={consultarReserva} style={{ ...btnPrincipalStyle, backgroundColor: '#555' }}>Consultar</button>
        </div>
      </div>

      {/* TABLA DE RESULTADOS */}
      {vuelos.length > 0 && (
        <div style={{ marginTop: '40px', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', border: '1px solid #ddd' }}>
          <h3>Vuelos Disponibles</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee' }}>
                <th style={thStyle}>Origen</th>
                <th style={thStyle}>Destino</th>
                <th style={thStyle}>Precio</th>
                <th style={thStyle}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {vuelos.map(v => (
                <tr key={v.idVuelo} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={tdStyle}>{v.origen?.nombre}</td>
                  <td style={tdStyle}>{v.destino?.nombre}</td>
                  <td style={tdStyle}>${v.precioBase}</td>
                  <td style={tdStyle}>
                    <button onClick={() => navigate('/reservar', { state: v })} style={btnReservaStyle}>Reservar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Estilos internos
const boxStyle = { backgroundColor: '#fff', padding: '25px', borderRadius: '12px', width: '320px', border: '1px solid #ddd', boxShadow: '0 4px 8px rgba(0,0,0,0.05)' };
const inputStyle = { width: '100%', padding: '10px', margin: '5px 0 15px 0', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' };
const btnPrincipalStyle = { width: '100%', padding: '12px', backgroundColor: '#B31010', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' };
const thStyle = { padding: '12px', textAlign: 'center', backgroundColor: '#f8f8f8' };
const tdStyle = { padding: '12px', textAlign: 'center' };
const btnReservaStyle = { padding: '5px 15px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' };

export default Home;