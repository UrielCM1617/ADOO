package com.escom.vuelos.controller;

import com.escom.vuelos.model.Usuario;
import com.escom.vuelos.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*") // Permite la comunicación con el puerto 3000 de React
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // --- CLASE AUXILIAR PARA EL LOGIN ---
    // Esto permite recibir el JSON { "email": "...", "password": "..." }
    public static class LoginRequest {
        public String email;
        public String password;
    }

    // 1. REGISTRO DE NUEVO USUARIO
    @PostMapping("/registro")
    public ResponseEntity<?> registrar(@RequestBody Usuario usuario) {
        try {
            // Verificamos si el email ya existe en PostgreSQL
            if (usuarioService.buscarPorEmail(usuario.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().body("Error: El email ya está registrado.");
            }
            Usuario nuevoUsuario = usuarioService.registrarUsuario(usuario);
            return ResponseEntity.ok(nuevoUsuario);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error al registrar: " + e.getMessage());
        }
    }

    // 2. LOGIN (AUTENTICACIÓN)
    // Cambiado a @RequestBody para que lea el JSON enviado por Axios
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest datos) {
        try {
            boolean esValido = usuarioService.validarCredenciales(datos.email, datos.password);
            
            if (esValido) {
                Optional<Usuario> usuario = usuarioService.buscarPorEmail(datos.email);
                return ResponseEntity.ok(usuario.get()); // Enviamos los datos del usuario logueado a React
            } else {
                return ResponseEntity.status(401).body("Credenciales incorrectas");
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error en el servidor: " + e.getMessage());
        }
    }
}