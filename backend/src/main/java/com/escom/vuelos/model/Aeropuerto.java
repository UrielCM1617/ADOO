package com.escom.vuelos.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "aeropuertos")
@Data
public class Aeropuerto {
    @Id
    private String idAeropuerto; // Usaremos el código IATA (ej. MEX, JFK)

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String ciudad;
}