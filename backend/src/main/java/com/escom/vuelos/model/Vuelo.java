package com.escom.vuelos.model;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDateTime;

@Entity
@Table(name = "vuelos")
@Data
public class Vuelo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idVuelo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "origen_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Aeropuerto origen;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "destino_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Aeropuerto destino;

    private LocalDateTime fecha;
    private Double precioBase;
}