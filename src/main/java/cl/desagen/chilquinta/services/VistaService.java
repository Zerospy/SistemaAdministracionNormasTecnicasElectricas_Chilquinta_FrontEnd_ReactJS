package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.VistaEntity;
import cl.desagen.chilquinta.repositories.VistaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VistaService {

    @Autowired
    private VistaRepository vistaRepository;

    public Iterable<VistaEntity> findAll() {
        return vistaRepository.findAll();
    }

    public Iterable<VistaEntity> findAll(Pageable pageable) {
        return vistaRepository.findAll(pageable);
    }

    public VistaEntity save(VistaEntity vistaEntity) {
        return vistaRepository.save(vistaEntity);
    }

    public Iterable<VistaEntity> saveAll(Iterable<VistaEntity> vistaEntities) {
        return vistaRepository.saveAll(vistaEntities);
    }


    public Optional<VistaEntity> findById(Long id) {
        return vistaRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return vistaRepository.existsById(id);
    }

    public Iterable<VistaEntity> findAllById(Iterable<Long> ids) {
        return vistaRepository.findAllById(ids);
    }

    public long count() {
        return vistaRepository.count();
    }

    public void deleteById(Long id) {
        vistaRepository.deleteById(id);
    }

    public void delete(VistaEntity vistaEntity) {
        vistaRepository.delete(vistaEntity);
    }

    public void deleteAll(Iterable<VistaEntity> vistaEntities) {
        vistaRepository.deleteAll(vistaEntities);
    }

    public void deleteAll() {
        vistaRepository.deleteAll();
    }

    public Iterable<VistaEntity> findAll(Sort sort) {
        return vistaRepository.findAll(sort);
    }

}
