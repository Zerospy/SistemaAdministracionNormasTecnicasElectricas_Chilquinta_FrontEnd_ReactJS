package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.UsuarioEntity;
import cl.desagen.chilquinta.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Iterable<UsuarioEntity> findAll() {
        return usuarioRepository.findAll();
    }

    public Iterable<UsuarioEntity> findAll(Pageable pageable) {
        return usuarioRepository.findAll(pageable);
    }

    public UsuarioEntity save(UsuarioEntity usuarioEntity) {
        return usuarioRepository.save(usuarioEntity);
    }

    public Iterable<UsuarioEntity> saveAll(Iterable<UsuarioEntity> usuarioEntities) {
        return usuarioRepository.saveAll(usuarioEntities);
    }

    public Optional<UsuarioEntity> findById(Integer id) {
        return usuarioRepository.findById(id);
    }

    public Optional<UsuarioEntity> findByUsuarioAndClave(String username, String clave) {
        return usuarioRepository.findByUsuarioAndClave(username, clave);
    }


    public Optional<UsuarioEntity> findByUsuario(String username) {
        return usuarioRepository.findByUsuario(username);
    }

    public boolean existsById(Integer id) {
        return usuarioRepository.existsById(id);
    }

    public Iterable<UsuarioEntity> findAllById(Iterable<Integer> ids) {
        return usuarioRepository.findAllById(ids);
    }

    public long count() {
        return usuarioRepository.count();
    }

    public void deleteById(Integer id) {
        usuarioRepository.deleteById(id);
    }

    public void delete(UsuarioEntity usuarioEntity) {
        usuarioRepository.delete(usuarioEntity);
    }

    public void deleteAll(Iterable<UsuarioEntity> usuarioEntities) {
        usuarioRepository.deleteAll(usuarioEntities);
    }

    public void deleteAll() {
        usuarioRepository.deleteAll();
    }

    public Iterable<UsuarioEntity> findAll(Sort sort) {
        return usuarioRepository.findAll(sort);
    }

}
