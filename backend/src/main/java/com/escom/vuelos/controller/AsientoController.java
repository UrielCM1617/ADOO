package com.escom.vuelos.controller;

import com.escom.vuelos.model.Asiento;
import com.escom.vuelos.service.AsientoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/asientos")
@CrossOrigin(origins = "*")
public class AsientoController {

    @Autowired
    private AsientoService asientoService;

    @GetMapping("/vuelo/{idVuelo}")
    public ResponseEntity<List<Asiento>> listarAsientos(@PathVariable Long idVuelo) {
        // Asegúrate de que el método en AsientoService se llame exactamente así
        return ResponseEntity.ok(asientoService.obtenerDisponiblesPorVuelo(idVuelo));
    }
}