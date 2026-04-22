package com.escom.vuelos;

import com.escom.vuelos.repository.AeropuertoRepository;
import com.escom.vuelos.repository.VueloRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    // Mantenemos las referencias por si las necesitas después
    private final AeropuertoRepository aeropuertoRepository;
    private final VueloRepository vueloRepository;

    public DataInitializer(AeropuertoRepository aeropuertoRepository, VueloRepository vueloRepository) {
        this.aeropuertoRepository = aeropuertoRepository;
        this.vueloRepository = vueloRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Hemos vaciado la inserción manual para evitar errores de llaves duplicadas (DataIntegrityViolationException).
        // El sistema ahora utilizará los datos que ya existen en tu base de datos de PostgreSQL.
        
        System.out.println(">>> DataInitializer: El sistema ha iniciado correctamente utilizando los datos de PostgreSQL.");
    }
}