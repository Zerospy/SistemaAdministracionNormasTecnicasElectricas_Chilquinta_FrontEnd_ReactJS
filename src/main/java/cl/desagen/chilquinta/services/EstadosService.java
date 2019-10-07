package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.EstadosEntity;
import cl.desagen.chilquinta.repositories.EstadosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EstadosService {

    @Autowired
    private EstadosRepository estadosRepository;

    public Iterable<EstadosEntity> findAll() {
        return estadosRepository.findAll();
    }

    public Iterable<EstadosEntity> findAll(Pageable pageable) {
        return estadosRepository.findAll(pageable);
    }

    public EstadosEntity save(EstadosEntity estadosEntity) {
        return estadosRepository.save(estadosEntity);
    }

    public Iterable<EstadosEntity> saveAll(Iterable<EstadosEntity> estadosEntities) {
        return estadosRepository.saveAll(estadosEntities);
    }


    public Optional<EstadosEntity> findById(Long id) {
        return estadosRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return estadosRepository.existsById(id);
    }

    public Iterable<EstadosEntity> findAllById(Iterable<Long> ids) {
        return estadosRepository.findAllById(ids);
    }

    public long count() {
        return estadosRepository.count();
    }

    public void deleteById(Long id) {
        estadosRepository.deleteById(id);
    }

    public void delete(EstadosEntity estadosEntity) {
        estadosRepository.delete(estadosEntity);
    }

    public void deleteAll(Iterable<EstadosEntity> estadosEntities) {
        estadosRepository.deleteAll(estadosEntities);
    }

    public void deleteAll() {
        estadosRepository.deleteAll();
    }

    public Iterable<EstadosEntity> findAll(Sort sort) {
        return estadosRepository.findAll(sort);
    }

}
