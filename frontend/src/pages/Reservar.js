import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Reservar() {
  const { state: locationState } = useLocation();
  const navigate = useNavigate();
  const state = locationState || JSON.parse(localStorage.getItem('vueloRespaldo'));

  const [asientos, setAsientos] = useState([]);
  const [asientoSeleccionado, setAsientoSeleccionado] = useState("");
  const [tipoClase, setTipoClase] = useState("TURISTA");
  const [precioFinal, setPrecioFinal] = useState(state?.precioBase || 0);

  useEffect(() => {
    if (locationState) {
      localStorage.setItem('vueloRespaldo', JSON.stringify(locationState));
    }

    if (state?.idVuelo) {
      axios.get(`http://localhost:8080/api/asientos/vuelo/${state.idVuelo}`)
        .then(res => setAsientos(res.data))
        .catch(err => console.error("Error cargando asientos", err));
    }
  }, [locationState, state?.idVuelo]);

  useEffect(() => {
    if (!state) return;

    if (tipoClase === "VIP") {
      setPrecioFinal(state.precioBase + 500);
    } else {
      setPrecioFinal(state.precioBase);
    }
  }, [tipoClase, state]);

  const handlePagar = async () => {
    const idUsuarioLogueado = localStorage.getItem('usuarioId');

    if (!idUsuarioLogueado) {
      alert("Debes iniciar sesión antes de reservar.");
      navigate('/login');
      return;
    }

    if (!asientoSeleccionado) {
      alert("Por favor, selecciona un asiento.");
      return;
    }

    const payload = {
      usuario: { idUsuario: parseInt(idUsuarioLogueado) },
      vuelo: { idVuelo: state.idVuelo },
      asiento: { idAsiento: parseInt(asientoSeleccionado) },
      precioTotal: precioFinal,
      tipoClase: tipoClase,
      estatus: "PAGADO"
    };

    try {
      const res = await axios.post("http://localhost:8080/api/reservas/crear", payload);
      alert(`¡Reserva Exitosa!\nTu código es: ${res.data.codigoConfirmacion}`);
      localStorage.removeItem('vueloRespaldo');
      navigate('/');
    } catch (err) {
      alert("Error: " + (err.response?.data || err.message));
    }
  };

  if (!state) {
    return (
      <div className="empty-state">
        <div className="panel-card">
          <h2>No hay vuelo seleccionado</h2>
          <p>Primero busca un vuelo desde la pantalla principal.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Ir al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="reserve-page">
      <div className="reserve-card">
        <div className="reserve-header">
          <span className="reserve-badge">Configuración del viaje</span>
          <h2>Reserva tu vuelo</h2>
          <p>Selecciona tu clase y asiento antes de confirmar la compra.</p>
        </div>

        <div className="reserve-summary">
          <div className="summary-item">
            <span className="summary-label">Ruta</span>
            <span className="summary-value">
              {state.origen?.nombre} ➜ {state.destino?.nombre}
            </span>
          </div>

          <div className="summary-item">
            <span className="summary-label">Precio base</span>
            <span className="summary-value">${state.precioBase}</span>
          </div>
        </div>

        <div className="field-group">
          <label>Tipo de clase</label>
          <select
            className="input-control"
            onChange={(e) => setTipoClase(e.target.value)}
            value={tipoClase}
          >
            <option value="TURISTA">Turista (Precio base)</option>
            <option value="VIP">VIP (+ $500.00)</option>
          </select>
        </div>

        <div className="field-group">
          <label>Selecciona tu asiento</label>
          <select
            className="input-control"
            onChange={(e) => setAsientoSeleccionado(e.target.value)}
            value={asientoSeleccionado}
          >
            <option value="">-- Elige un asiento --</option>
            {asientos.filter(a => a.disponible).map(a => (
              <option key={a.idAsiento} value={a.idAsiento}>
                Asiento {a.numero} ({a.tipo})
              </option>
            ))}
          </select>
        </div>

        <div className="price-box">
          <span>Total a pagar</span>
          <strong>${precioFinal}</strong>
        </div>

        <button onClick={handlePagar} className="btn btn-success full-width">
          Confirmar y reservar
        </button>
      </div>
    </div>
  );
}

export default Reservar;