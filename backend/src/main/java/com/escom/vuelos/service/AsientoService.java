package com.escom.vuelos.service;

import com.escom.vuelos.model.Asiento;
import com.escom.vuelos.repository.AsientoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AsientoService {

    @Autowired
    private AsientoRepository asientoRepository;

    
    public List<Asiento> obtenerDisponiblesPorVuelo(Long idVuelo) {
        return asientoRepository.buscarAsientosDisponibles(idVuelo);
    }
}