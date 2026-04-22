package com.escom.vuelos.service;

import com.escom.vuelos.model.Reserva;
import com.escom.vuelos.model.Asiento;
import com.escom.vuelos.repository.ReservaRepository;
import com.escom.vuelos.repository.AsientoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private AsientoRepository asientoRepository;

    @Transactional
    public Reserva crearReserva(Reserva reserva) {
        if (reserva.getAsiento() == null || reserva.getAsiento().getIdAsiento() == null) {
            throw new RuntimeException("Debe seleccionar un asiento");
        }

        Long idAsiento = reserva.getAsiento().getIdAsiento();

        Asiento asiento = asientoRepository.findById(idAsiento)
                .orElseThrow(() -> new RuntimeException("Asiento no encontrado"));

        if (!asiento.isDisponible()) {
            throw new RuntimeException("El asiento " + asiento.getNumero() + " ya está ocupado");
        }

        // Marcar asiento como ocupado
        asiento.setDisponible(false);
        asientoRepository.save(asiento);

        // Completar datos
        reserva.setFechaReserva(LocalDateTime.now());
        
        // Generamos el código (UAM-XXXXXX)
        String codigo = "UAM-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        reserva.setCodigoConfirmacion(codigo);

        return reservaRepository.save(reserva);
    }

    // NUEVO: Método para buscar la reserva por el código
    public Optional<Reserva> buscarPorCodigo(String codigo) {
        return reservaRepository.findByCodigoConfirmacion(codigo);
    }
}