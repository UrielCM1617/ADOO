package com.escom.vuelos.repository;

import com.escom.vuelos.model.Vuelo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VueloRepository extends JpaRepository<Vuelo, Long> {

    // Usamos JPQL para entrar a las propiedades del objeto Aeropuerto
    @Query("SELECT v FROM Vuelo v WHERE v.origen.nombre = :origen " +
           "AND v.destino.nombre = :destino " +
           "AND CAST(v.fecha AS date) = CAST(:fecha AS date)")
    List<Vuelo> buscarVuelosPersonalizado(
        @Param("origen") String origen, 
        @Param("destino") String destino, 
        @Param("fecha") String fecha
    );
}