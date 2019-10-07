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


    public Optional<UsuarioEntity> findById(Long id) {
        return usuarioRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return usuarioRepository.existsById(id);
    }

    public Iterable<UsuarioEntity> findAllById(Iterable<Long> ids) {
        return usuarioRepository.findAllById(ids);
    }

    public long count() {
        return usuarioRepository.count();
    }

    public void deleteById(Long id) {
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
