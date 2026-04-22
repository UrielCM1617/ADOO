import axios from 'axios';

const API_URL = "http://localhost:8080/api/vuelos";

const buscarVuelosFiltro = async (origen, destino, fecha) => {
    return await axios.get(`${API_URL}/buscar`, {
        params: { origen, destino, fecha }
    });
};

const services = { buscarVuelosFiltro };
export default services;