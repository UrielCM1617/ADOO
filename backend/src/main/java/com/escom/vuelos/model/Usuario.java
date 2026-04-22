package com.escom.vuelos.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity // Le dice a Spring que esta clase es una tabla de la DB
@Table(name = "usuarios")
@Data // Genera Getters y Setters automáticamente gracias a Lombok
@NoArgsConstructor // Crea un constructor vacío (obligatorio para JPA)
@AllArgsConstructor // Crea un constructor con todos los campos
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUsuario;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false)
    private String password;

    // Relación: Un usuario puede tener muchas reservas
    // mappedBy indica que el dueño de la relación es el campo "usuario" en la clase Reserva
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Reserva> reservas;
}