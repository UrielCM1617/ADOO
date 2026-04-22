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
      const res = await vueloService.buscarVuelosFiltro(
        filtros.origen,
        filtros.destino,
        filtros.fecha
      );
      setVuelos(res.data);
    } catch (err) {
      alert("No se encontraron vuelos.");
    }
  };

  const consultarReserva = async () => {
    const codigoLimpio = codigoBusqueda.trim().toUpperCase();

    if (!codigoLimpio) {
      alert("Por favor ingresa un código.");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:8080/api/reservas/buscar/${codigoLimpio}`);
      const r = res.data;

      alert(
        `✅ Reserva Encontrada:\n\n` +
        `Pasajero: ${r.usuario.nombre}\n` +
        `Vuelo: ${r.vuelo.origen.nombre} ➡️ ${r.vuelo.destino.nombre}\n` +
        `Asiento: ${r.asiento.numero} (${r.tipoClase})\n` +
        `Estatus: ${r.estatus}\n` +
        `Total: $${r.precioTotal}`
      );
    } catch (err) {
      alert("No se encontró ninguna reserva con el código: " + codigoLimpio);
    }
  };

  return (
    <div className="home-shell frame-home">
      <section className="hero">
        <div className="hero-badge">Diseño renovado del sistema</div>
        <h1>Planea tu viaje con una interfaz más elegante</h1>
        <p>
          Consulta rutas, encuentra vuelos disponibles y revisa tu reserva
          desde una experiencia visual más clara, moderna y profesional.
        </p>
      </section>

      <section className="card-grid">
        <div className="panel-card">
          <div className="panel-header">
            <h3>Buscar vuelo</h3>
            <span className="panel-icon">✈</span>
          </div>

          <div className="field-group">
            <label>Origen</label>
            <select
              className="input-control"
              value={filtros.origen}
              onChange={(e) => setFiltros({ ...filtros, origen: e.target.value })}
            >
              <option value="">Selecciona origen</option>
              {aeropuertos.map((a) => (
                <option key={a.n} value={a.n}>{a.n}</option>
              ))}
            </select>
          </div>

          <div className="field-group">
            <label>Destino</label>
            <select
              className="input-control"
              value={filtros.destino}
              onChange={(e) => setFiltros({ ...filtros, destino: e.target.value })}
            >
              <option value="">Selecciona destino</option>
              {aeropuertos.map((a) => (
                <option key={a.n} value={a.n}>{a.n}</option>
              ))}
            </select>
          </div>

          <div className="field-group">
            <label>Fecha</label>
            <input
              type="date"
              className="input-control"
              value={filtros.fecha}
              onChange={(e) => setFiltros({ ...filtros, fecha: e.target.value })}
            />
          </div>

          <button onClick={realizarBusqueda} className="btn btn-primary full-width">
            Buscar vuelos
          </button>
        </div>

        <div className="panel-card secondary-card">
          <div className="panel-header">
            <h3>Consultar reserva</h3>
            <span className="panel-icon">⌘</span>
          </div>

          <p className="panel-text">
            Ingresa tu código de confirmación para consultar el estado de tu viaje.
          </p>

          <div className="field-group">
            <label>Código</label>
            <input
              type="text"
              placeholder="Ej: UAM-A1B2C3"
              className="input-control"
              value={codigoBusqueda}
              onChange={(e) => setCodigoBusqueda(e.target.value)}
            />
          </div>

          <button onClick={consultarReserva} className="btn btn-secondary full-width">
            Consultar reserva
          </button>
        </div>
      </section>

      {vuelos.length > 0 && (
        <section className="results-section">
          <div className="results-header">
            <h3>Vuelos disponibles</h3>
            <p>{vuelos.length} resultado(s) encontrado(s)</p>
          </div>

          <div className="table-wrap">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Origen</th>
                  <th>Destino</th>
                  <th>Precio</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {vuelos.map((v) => (
                  <tr key={v.idVuelo}>
                    <td>{v.origen?.nombre}</td>
                    <td>{v.destino?.nombre}</td>
                    <td>${v.precioBase}</td>
                    <td>
                      <button
                        onClick={() => navigate('/reservar', { state: v })}
                        className="btn btn-dark small-btn"
                      >
                        Reservar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;