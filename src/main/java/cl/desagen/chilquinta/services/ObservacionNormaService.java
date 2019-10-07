package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.ObservacionNormaEntity;
import cl.desagen.chilquinta.repositories.ObservacionNormaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ObservacionNormaService {

    @Autowired
    private ObservacionNormaRepository observacionnormaRepository;

    public Iterable<ObservacionNormaEntity> findAll() {
        return observacionnormaRepository.findAll();
    }

    public Iterable<ObservacionNormaEntity> findAll(Pageable pageable) {
        return observacionnormaRepository.findAll(pageable);
    }

    public ObservacionNormaEntity save(ObservacionNormaEntity observacionnormaEntity) {
        return observacionnormaRepository.save(observacionnormaEntity);
    }

    public Iterable<ObservacionNormaEntity> saveAll(Iterable<ObservacionNormaEntity> observacionnormaEntities) {
        return observacionnormaRepository.saveAll(observacionnormaEntities);
    }


    public Optional<ObservacionNormaEntity> findById(Long id) {
        return observacionnormaRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return observacionnormaRepository.existsById(id);
    }

    public Iterable<ObservacionNormaEntity> findAllById(Iterable<Long> ids) {
        return observacionnormaRepository.findAllById(ids);
    }

    public long count() {
        return observacionnormaRepository.count();
    }

    public void deleteById(Long id) {
        observacionnormaRepository.deleteById(id);
    }

    public void delete(ObservacionNormaEntity observacionnormaEntity) {
        observacionnormaRepository.delete(observacionnormaEntity);
    }

    public void deleteAll(Iterable<ObservacionNormaEntity> observacionnormaEntities) {
        observacionnormaRepository.deleteAll(observacionnormaEntities);
    }

    public void deleteAll() {
        observacionnormaRepository.deleteAll();
    }

    public Iterable<ObservacionNormaEntity> findAll(Sort sort) {
        return observacionnormaRepository.findAll(sort);
    }

}
