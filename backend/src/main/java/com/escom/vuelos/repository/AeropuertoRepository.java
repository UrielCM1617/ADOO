package com.escom.vuelos.repository;

import com.escom.vuelos.model.Aeropuerto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AeropuertoRepository extends JpaRepository<Aeropuerto, String> {
}