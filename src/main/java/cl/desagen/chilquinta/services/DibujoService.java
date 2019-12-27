package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.DibujoEntity;
import cl.desagen.chilquinta.repositories.DibujoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DibujoService {

    @Autowired
    private DibujoRepository dibujoRepository;

    public Iterable<DibujoEntity> findAll() {
        return dibujoRepository.findAll();
    }

    public Iterable<DibujoEntity> findAll(Pageable pageable) {
        return dibujoRepository.findAll(pageable);
    }

    public DibujoEntity save(DibujoEntity dibujoEntity) {
        return dibujoRepository.save(dibujoEntity);
    }

    public Iterable<DibujoEntity> saveAll(Iterable<DibujoEntity> dibujoEntities) {
        return dibujoRepository.saveAll(dibujoEntities);
    }


    public Optional<DibujoEntity> findById(Long id) {
        return dibujoRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return dibujoRepository.existsById(id);
    }

    public Iterable<DibujoEntity> findAllById(Iterable<Long> ids) {
        return dibujoRepository.findAllById(ids);
    }

    public long count() {
        return dibujoRepository.count();
    }

    public void deleteById(Long id) {
        dibujoRepository.deleteById(id);
    }

    public void delete(DibujoEntity dibujoEntity) {
        dibujoRepository.delete(dibujoEntity);
    }

    public void deleteAll(Iterable<DibujoEntity> dibujoEntities) {
        dibujoRepository.deleteAll(dibujoEntities);
    }

    public void deleteAll() {
        dibujoRepository.deleteAll();
    }

    public Iterable<DibujoEntity> findAll(Sort sort) {
        return dibujoRepository.findAll(sort);
    }

}
