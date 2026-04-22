package com.escom.vuelos.service;

import com.escom.vuelos.model.Vuelo;
import com.escom.vuelos.repository.VueloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class VueloService {

    @Autowired
    private VueloRepository vueloRepository;

    public List<Vuelo> obtenerTodosLosVuelos() {
        return vueloRepository.findAll();
    }

    public Vuelo obtenerVueloPorId(Long id) {
        return vueloRepository.findById(id).orElse(null);
    }
    
    
    public List<Vuelo> buscarConFiltros(String origen, String destino, String fecha) {
        // Cambiamos el nombre al que definimos en el repositorio
        return vueloRepository.buscarVuelosPersonalizado(origen, destino, fecha);
    }
}