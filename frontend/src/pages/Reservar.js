import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Reservar() {
  const { state: locationState } = useLocation();
  const navigate = useNavigate();
  const state = locationState || JSON.parse(localStorage.getItem('vueloRespaldo'));

  const [asientos, setAsientos] = useState([]);
  const [asientoSeleccionado, setAsientoSeleccionado] = useState("");
  const [tipoClase, setTipoClase] = useState("TURISTA"); // Estado para la clase
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

  // Actualizar precio si cambia la clase
  useEffect(() => {
    if (tipoClase === "VIP") {
      setPrecioFinal(state.precioBase + 500); // Cargo extra por VIP
    } else {
      setPrecioFinal(state.precioBase);
    }
  }, [tipoClase, state.precioBase]);

  const handlePagar = async () => {
    const idUsuarioLogueado = localStorage.getItem('usuarioId'); 
    
    if (!asientoSeleccionado) {
      alert("Por favor, selecciona un asiento.");
      return;
    }

    const payload = {
      usuario: { idUsuario: parseInt(idUsuarioLogueado) },
      vuelo: { idVuelo: state.idVuelo },
      asiento: { idAsiento: parseInt(asientoSeleccionado) }, 
      precioTotal: precioFinal,
      tipoClase: tipoClase, // <--- Enviamos el tipo de clase
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

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <div style={confirmCardStyle}>
        <h2 style={{ color: '#B31010' }}>Configura tu Viaje</h2>
        <div style={{ textAlign: 'left', margin: '20px 0' }}>
          <p><strong>Vuelo:</strong> {state.origen?.nombre} ➡️ {state.destino?.nombre}</p>
          
          <label><strong>Tipo de Clase:</strong></label>
          <select style={selectStyle} onChange={(e) => setTipoClase(e.target.value)} value={tipoClase}>
            <option value="TURISTA">Turista (Precio Base)</option>
            <option value="VIP">VIP (+ $500.00)</option>
          </select>

          <label style={{ display: 'block', marginTop: '15px' }}><strong>Selecciona tu Asiento:</strong></label>
          <select 
            style={selectStyle} 
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
          
          <p style={{ fontSize: '1.4rem', color: '#28a745', marginTop: '20px', textAlign: 'center' }}>
            <strong>Total a Pagar: ${precioFinal}</strong>
          </p>
        </div>
        <button onClick={handlePagar} style={btnConfirmarStyle}>Confirmar y Reservar</button>
      </div>
    </div>
  );
}

const selectStyle = { width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' };
const confirmCardStyle = { backgroundColor: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #ddd', display: 'inline-block', minWidth: '400px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' };
const btnConfirmarStyle = { width: '100%', backgroundColor: '#28a745', color: 'white', padding: '15px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' };

export default Reservar;