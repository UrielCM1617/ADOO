package com.escom.vuelos.model;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "asientos")
@Data
public class Asiento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAsiento;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_vuelo")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
    private Vuelo vuelo;

    private String numero;
    private boolean disponible;
}