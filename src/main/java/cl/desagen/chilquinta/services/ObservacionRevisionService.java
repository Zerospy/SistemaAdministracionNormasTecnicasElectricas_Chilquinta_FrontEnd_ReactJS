package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.ObservacionRevisionEntity;
import cl.desagen.chilquinta.repositories.ObservacionRevisionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ObservacionRevisionService {

    @Autowired
    private ObservacionRevisionRepository observacionrevisionRepository;

    public Iterable<ObservacionRevisionEntity> findAll() {
        return observacionrevisionRepository.findAll();
    }

    public Iterable<ObservacionRevisionEntity> findAll(Pageable pageable) {
        return observacionrevisionRepository.findAll(pageable);
    }

    public ObservacionRevisionEntity save(ObservacionRevisionEntity observacionrevisionEntity) {
        return observacionrevisionRepository.save(observacionrevisionEntity);
    }

    public Iterable<ObservacionRevisionEntity> saveAll(Iterable<ObservacionRevisionEntity> observacionrevisionEntities) {
        return observacionrevisionRepository.saveAll(observacionrevisionEntities);
    }


    public Optional<ObservacionRevisionEntity> findById(Long id) {
        return observacionrevisionRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return observacionrevisionRepository.existsById(id);
    }

    public Iterable<ObservacionRevisionEntity> findAllById(Iterable<Long> ids) {
        return observacionrevisionRepository.findAllById(ids);
    }

    public long count() {
        return observacionrevisionRepository.count();
    }

    public void deleteById(Long id) {
        observacionrevisionRepository.deleteById(id);
    }

    public void delete(ObservacionRevisionEntity observacionrevisionEntity) {
        observacionrevisionRepository.delete(observacionrevisionEntity);
    }

    public void deleteAll(Iterable<ObservacionRevisionEntity> observacionrevisionEntities) {
        observacionrevisionRepository.deleteAll(observacionrevisionEntities);
    }

    public void deleteAll() {
        observacionrevisionRepository.deleteAll();
    }

    public Iterable<ObservacionRevisionEntity> findAll(Sort sort) {
        return observacionrevisionRepository.findAll(sort);
    }

}
