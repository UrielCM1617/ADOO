import axios from 'axios';

const API_URL = "http://localhost:8080/api/reservas";

const guardarReserva = async (datosReserva) => {
    return await axios.post(`${API_URL}/crear`, datosReserva);
};

const services = { guardarReserva };
export default services;