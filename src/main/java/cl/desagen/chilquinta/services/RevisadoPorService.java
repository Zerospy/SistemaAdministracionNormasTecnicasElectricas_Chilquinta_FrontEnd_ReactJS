package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.RevisadoPorEntity;
import cl.desagen.chilquinta.repositories.RevisadoPorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RevisadoPorService {

    @Autowired
    private RevisadoPorRepository revisadoporRepository;

    public Iterable<RevisadoPorEntity> findAll() {
        return revisadoporRepository.findAll();
    }

    public Iterable<RevisadoPorEntity> findAll(Pageable pageable) {
        return revisadoporRepository.findAll(pageable);
    }

    public RevisadoPorEntity save(RevisadoPorEntity revisadoporEntity) {
        return revisadoporRepository.save(revisadoporEntity);
    }

    public Iterable<RevisadoPorEntity> saveAll(Iterable<RevisadoPorEntity> revisadoporEntities) {
        return revisadoporRepository.saveAll(revisadoporEntities);
    }


    public Optional<RevisadoPorEntity> findById(Long id) {
        return revisadoporRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return revisadoporRepository.existsById(id);
    }

    public Iterable<RevisadoPorEntity> findAllById(Iterable<Long> ids) {
        return revisadoporRepository.findAllById(ids);
    }

    public long count() {
        return revisadoporRepository.count();
    }

    public void deleteById(Long id) {
        revisadoporRepository.deleteById(id);
    }

    public void delete(RevisadoPorEntity revisadoporEntity) {
        revisadoporRepository.delete(revisadoporEntity);
    }

    public void deleteAll(Iterable<RevisadoPorEntity> revisadoporEntities) {
        revisadoporRepository.deleteAll(revisadoporEntities);
    }

    public void deleteAll() {
        revisadoporRepository.deleteAll();
    }

    public Iterable<RevisadoPorEntity> findAll(Sort sort) {
        return revisadoporRepository.findAll(sort);
    }

}
