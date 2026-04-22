package com.escom.vuelos.controller;

import com.escom.vuelos.model.Vuelo;
import com.escom.vuelos.service.VueloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vuelos")
@CrossOrigin(origins = "*")
public class VueloController {

    @Autowired
    private VueloService vueloService;

    // Obtener todos los vuelos disponibles
    @GetMapping
    public List<Vuelo> listarVuelos() {
        return vueloService.obtenerTodosLosVuelos();
    }

    // Obtener un vuelo específico por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Vuelo> obtenerVuelo(@PathVariable Long id) {
        Vuelo vuelo = vueloService.obtenerVueloPorId(id);
        if (vuelo != null) {
            return ResponseEntity.ok(vuelo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/buscar")
    public List<Vuelo> buscarVuelos(
            @RequestParam String origen,
            @RequestParam String destino,
            @RequestParam String fecha) {
        // Imprime en consola para ver qué llega desde React
        System.out.println("Buscando: " + origen + " a " + destino + " en " + fecha);
        return vueloService.buscarConFiltros(origen, destino, fecha);
    }
}