package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.ComponenteEntity;
import cl.desagen.chilquinta.repositories.ComponenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ComponenteService {

    @Autowired
    private ComponenteRepository componenteRepository;

    public Iterable<ComponenteEntity> findAll() {
        return componenteRepository.findAll();
    }

    public Iterable<ComponenteEntity> findAll(Pageable pageable) {
        return componenteRepository.findAll(pageable);
    }

    public ComponenteEntity save(ComponenteEntity componenteEntity) {
        return componenteRepository.save(componenteEntity);
    }

    public Iterable<ComponenteEntity> saveAll(Iterable<ComponenteEntity> componenteEntities) {
        return componenteRepository.saveAll(componenteEntities);
    }


    public Optional<ComponenteEntity> findById(Long id) {
        return componenteRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return componenteRepository.existsById(id);
    }

    public Iterable<ComponenteEntity> findAllById(Iterable<Long> ids) {
        return componenteRepository.findAllById(ids);
    }

    public long count() {
        return componenteRepository.count();
    }

    public void deleteById(Long id) {
        componenteRepository.deleteById(id);
    }

    public void delete(ComponenteEntity componenteEntity) {
        componenteRepository.delete(componenteEntity);
    }

    public void deleteAll(Iterable<ComponenteEntity> componenteEntities) {
        componenteRepository.deleteAll(componenteEntities);
    }

    public void deleteAll() {
        componenteRepository.deleteAll();
    }

    public Iterable<ComponenteEntity> findAll(Sort sort) {
        return componenteRepository.findAll(sort);
    }

}
