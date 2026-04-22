package com.escom.vuelos.service;

import com.escom.vuelos.model.Usuario;
import com.escom.vuelos.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service // Indica que es un componente de lógica de negocio
public class UsuarioService {

    @Autowired // Inyecta el repositorio automáticamente
    private UsuarioRepository usuarioRepository;

    public Usuario registrarUsuario(Usuario usuario) {
        // Aquí se agregara la lógica para encriptar la contraseña antes de guardar
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    public boolean validarCredenciales(String email, String password) {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
        if (usuario.isPresent()) {
            // Por ahora comparación simple, luego usaremos BCrypt
            return usuario.get().getPassword().equals(password);
        }
        return false;
    }
}