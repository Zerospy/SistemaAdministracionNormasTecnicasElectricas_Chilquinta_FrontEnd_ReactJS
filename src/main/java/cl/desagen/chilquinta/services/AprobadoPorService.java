package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.AprobadoPorEntity;
import cl.desagen.chilquinta.repositories.AprobadoPorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AprobadoPorService {

    @Autowired
    private AprobadoPorRepository aprobadoporRepository;

    public Iterable<AprobadoPorEntity> findAll() {
        return aprobadoporRepository.findAll();
    }

    public Iterable<AprobadoPorEntity> findAll(Pageable pageable) {
        return aprobadoporRepository.findAll(pageable);
    }

    public AprobadoPorEntity save(AprobadoPorEntity aprobadoporEntity) {
        return aprobadoporRepository.save(aprobadoporEntity);
    }

    public Iterable<AprobadoPorEntity> saveAll(Iterable<AprobadoPorEntity> aprobadoporEntities) {
        return aprobadoporRepository.saveAll(aprobadoporEntities);
    }


    public Optional<AprobadoPorEntity> findById(Long id) {
        return aprobadoporRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return aprobadoporRepository.existsById(id);
    }

    public Iterable<AprobadoPorEntity> findAllById(Iterable<Long> ids) {
        return aprobadoporRepository.findAllById(ids);
    }

    public long count() {
        return aprobadoporRepository.count();
    }

    public void deleteById(Long id) {
        aprobadoporRepository.deleteById(id);
    }

    public void delete(AprobadoPorEntity aprobadoporEntity) {
        aprobadoporRepository.delete(aprobadoporEntity);
    }

    public void deleteAll(Iterable<AprobadoPorEntity> aprobadoporEntities) {
        aprobadoporRepository.deleteAll(aprobadoporEntities);
    }

    public void deleteAll() {
        aprobadoporRepository.deleteAll();
    }

    public Iterable<AprobadoPorEntity> findAll(Sort sort) {
        return aprobadoporRepository.findAll(sort);
    }

}
