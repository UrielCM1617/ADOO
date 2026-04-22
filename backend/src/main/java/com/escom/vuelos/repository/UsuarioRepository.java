package com.escom.vuelos.repository;

import com.escom.vuelos.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Método extra para buscar por email (útil para el Login)
    Optional<Usuario> findByEmail(String email);
}