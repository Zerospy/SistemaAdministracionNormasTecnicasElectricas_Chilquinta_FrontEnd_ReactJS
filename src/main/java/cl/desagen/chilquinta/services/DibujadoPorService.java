package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.DibujadoPorEntity;
import cl.desagen.chilquinta.repositories.DibujadoPorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DibujadoPorService {

    @Autowired
    private DibujadoPorRepository dibujadoporRepository;

    public Iterable<DibujadoPorEntity> findAll() {
        return dibujadoporRepository.findAll();
    }

    public Iterable<DibujadoPorEntity> findAll(Pageable pageable) {
        return dibujadoporRepository.findAll(pageable);
    }

    public DibujadoPorEntity save(DibujadoPorEntity dibujadoporEntity) {
        return dibujadoporRepository.save(dibujadoporEntity);
    }

    public Iterable<DibujadoPorEntity> saveAll(Iterable<DibujadoPorEntity> dibujadoporEntities) {
        return dibujadoporRepository.saveAll(dibujadoporEntities);
    }


    public Optional<DibujadoPorEntity> findById(Long id) {
        return dibujadoporRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return dibujadoporRepository.existsById(id);
    }

    public Iterable<DibujadoPorEntity> findAllById(Iterable<Long> ids) {
        return dibujadoporRepository.findAllById(ids);
    }

    public long count() {
        return dibujadoporRepository.count();
    }

    public void deleteById(Long id) {
        dibujadoporRepository.deleteById(id);
    }

    public void delete(DibujadoPorEntity dibujadoporEntity) {
        dibujadoporRepository.delete(dibujadoporEntity);
    }

    public void deleteAll(Iterable<DibujadoPorEntity> dibujadoporEntities) {
        dibujadoporRepository.deleteAll(dibujadoporEntities);
    }

    public void deleteAll() {
        dibujadoporRepository.deleteAll();
    }

    public Iterable<DibujadoPorEntity> findAll(Sort sort) {
        return dibujadoporRepository.findAll(sort);
    }

}
