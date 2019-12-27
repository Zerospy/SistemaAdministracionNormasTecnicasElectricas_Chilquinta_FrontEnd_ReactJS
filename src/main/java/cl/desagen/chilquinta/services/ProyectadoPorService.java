package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.ProyectadoPorEntity;
import cl.desagen.chilquinta.repositories.ProyectadoPorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProyectadoPorService {

    @Autowired
    private ProyectadoPorRepository proyectadoporRepository;

    public Iterable<ProyectadoPorEntity> findAll() {
        return proyectadoporRepository.findAll();
    }

    public Iterable<ProyectadoPorEntity> findAll(Pageable pageable) {
        return proyectadoporRepository.findAll(pageable);
    }

    public ProyectadoPorEntity save(ProyectadoPorEntity proyectadoporEntity) {
        return proyectadoporRepository.save(proyectadoporEntity);
    }

    public Iterable<ProyectadoPorEntity> saveAll(Iterable<ProyectadoPorEntity> proyectadoporEntities) {
        return proyectadoporRepository.saveAll(proyectadoporEntities);
    }


    public Optional<ProyectadoPorEntity> findById(Long id) {
        return proyectadoporRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return proyectadoporRepository.existsById(id);
    }

    public Iterable<ProyectadoPorEntity> findAllById(Iterable<Long> ids) {
        return proyectadoporRepository.findAllById(ids);
    }

    public long count() {
        return proyectadoporRepository.count();
    }

    public void deleteById(Long id) {
        proyectadoporRepository.deleteById(id);
    }

    public void delete(ProyectadoPorEntity proyectadoporEntity) {
        proyectadoporRepository.delete(proyectadoporEntity);
    }

    public void deleteAll(Iterable<ProyectadoPorEntity> proyectadoporEntities) {
        proyectadoporRepository.deleteAll(proyectadoporEntities);
    }

    public void deleteAll() {
        proyectadoporRepository.deleteAll();
    }

    public Iterable<ProyectadoPorEntity> findAll(Sort sort) {
        return proyectadoporRepository.findAll(sort);
    }

}
