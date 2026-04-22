package com.escom.vuelos.repository;

import com.escom.vuelos.model.Asiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AsientoRepository extends JpaRepository<Asiento, Long> {

    // Cambiamos el método problemático por una Query explícita
    @Query("SELECT a FROM Asiento a WHERE a.vuelo.idVuelo = :idVuelo AND a.disponible = true")
    List<Asiento> buscarAsientosDisponibles(@Param("idVuelo") Long idVuelo);
}