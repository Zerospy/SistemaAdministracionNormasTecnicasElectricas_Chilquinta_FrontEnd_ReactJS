package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.PerfilEntity;
import cl.desagen.chilquinta.repositories.PerfilRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PerfilService {

    @Autowired
    private PerfilRepository perfilRepository;

    public Iterable<PerfilEntity> findAll() {
        return perfilRepository.findAll();
    }

    public Iterable<PerfilEntity> findAll(Pageable pageable) {
        return perfilRepository.findAll(pageable);
    }

    public PerfilEntity save(PerfilEntity perfilEntity) {
        return perfilRepository.save(perfilEntity);
    }

    public Iterable<PerfilEntity> saveAll(Iterable<PerfilEntity> perfilEntities) {
        return perfilRepository.saveAll(perfilEntities);
    }


    public Optional<PerfilEntity> findById(Long id) {
        return perfilRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return perfilRepository.existsById(id);
    }

    public Iterable<PerfilEntity> findAllById(Iterable<Long> ids) {
        return perfilRepository.findAllById(ids);
    }

    public long count() {
        return perfilRepository.count();
    }

    public void deleteById(Long id) {
        perfilRepository.deleteById(id);
    }

    public void delete(PerfilEntity perfilEntity) {
        perfilRepository.delete(perfilEntity);
    }

    public void deleteAll(Iterable<PerfilEntity> perfilEntities) {
        perfilRepository.deleteAll(perfilEntities);
    }

    public void deleteAll() {
        perfilRepository.deleteAll();
    }

    public Iterable<PerfilEntity> findAll(Sort sort) {
        return perfilRepository.findAll(sort);
    }

}
