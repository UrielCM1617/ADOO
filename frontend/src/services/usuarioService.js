import axios from 'axios';

const API_URL = "http://localhost:8080/api/usuarios/registro";

const registrarUsuario = async (datosUsuario) => {
    return await axios.post(API_URL, datosUsuario);
};

// Nueva función de Login
const loginUsuario = async (email, password) => {
    return await axios.post("http://localhost:8080/api/usuarios/login", {
        email: email,
        password: password
    });
};

const services = { registrarUsuario, loginUsuario };
export default services;