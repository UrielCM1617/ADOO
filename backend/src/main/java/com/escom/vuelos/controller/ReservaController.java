package com.escom.vuelos.controller;

import com.escom.vuelos.model.Reserva;
import com.escom.vuelos.service.ReservaService;
import com.escom.vuelos.repository.ReservaRepository; // <--- IMPORTANTE: Añadir este import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "*")
public class ReservaController {
    
    @Autowired
    private ReservaService reservaService;

    @Autowired // <--- IMPORTANTE: Inyectar el repositorio
    private ReservaRepository reservaRepository;

    @PostMapping("/crear")
    public ResponseEntity<?> crearReserva(@RequestBody Reserva reserva) {
        try {
            if (reserva.getUsuario() == null || reserva.getVuelo() == null) {
                return ResponseEntity.badRequest().body("Error: Usuario o Vuelo no especificados.");
            }
            Reserva nuevaReserva = reservaService.crearReserva(reserva);
            return ResponseEntity.ok(nuevaReserva);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al crear la reserva: " + e.getMessage());
        }
    }

    @GetMapping("/buscar/{codigo}")
    public ResponseEntity<?> buscarPorCodigo(@PathVariable String codigo) {
        String codigoLimpio = codigo.trim().toUpperCase();
        System.out.println("DEBUG: Buscando en DB el código exacto: [" + codigoLimpio + "]");

        Optional<Reserva> encontrada = reservaRepository.findByCodigoConfirmacion(codigoLimpio);

        if (encontrada.isPresent()) {
            System.out.println("DEBUG: ¡Reserva encontrada en la base de datos!");
            return ResponseEntity.ok(encontrada.get());
        } else {
            System.out.println(" DEBUG: La base de datos devolvió VACÍO para: [" + codigoLimpio + "]");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró el código " + codigoLimpio);
        }
    }
}