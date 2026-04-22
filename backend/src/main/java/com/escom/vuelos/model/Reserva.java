package com.escom.vuelos.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "reservas")
@Data
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idReserva;

    // Solo definimos el nombre de la columna en la tabla 'reservas'
    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_vuelo", nullable = false)
    private Vuelo vuelo;

    @ManyToOne
    @JoinColumn(name = "id_asiento", nullable = false)
    private Asiento asiento;

    private String tipoClase;
    
    @Column(name = "codigo_confirmacion", nullable = false)
    private String codigoConfirmacion;

    private Double precioTotal;
    private LocalDateTime fechaReserva;
    private String estatus;

    public Reserva() {
        this.fechaReserva = LocalDateTime.now();
        this.estatus = "PAGADO";
    }
}