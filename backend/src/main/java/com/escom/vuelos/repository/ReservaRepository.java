package com.escom.vuelos.repository;

import com.escom.vuelos.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    // Usamos nativeQuery = true para hablarle directo a PostgreSQL
    @Query(value = "SELECT * FROM reservas WHERE codigo_confirmacion = :codigo LIMIT 1", nativeQuery = true)
    Optional<Reserva> findByCodigoConfirmacion(@Param("codigo") String codigo);
}