package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.LaminaNormaEntity;
import cl.desagen.chilquinta.repositories.LaminaNormaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LaminaNormaService {

    @Autowired
    private LaminaNormaRepository laminanormaRepository;

    public Iterable<LaminaNormaEntity> findAll() {
        return laminanormaRepository.findAll();
    }

    public Iterable<LaminaNormaEntity> findAll(Pageable pageable) {
        return laminanormaRepository.findAll(pageable);
    }

    public LaminaNormaEntity save(LaminaNormaEntity laminanormaEntity) {
        return laminanormaRepository.save(laminanormaEntity);
    }

    public Iterable<LaminaNormaEntity> saveAll(Iterable<LaminaNormaEntity> laminanormaEntities) {
        return laminanormaRepository.saveAll(laminanormaEntities);
    }


    public Optional<LaminaNormaEntity> findById(Long id) {
        return laminanormaRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return laminanormaRepository.existsById(id);
    }

    public Iterable<LaminaNormaEntity> findAllById(Iterable<Long> ids) {
        return laminanormaRepository.findAllById(ids);
    }

    public long count() {
        return laminanormaRepository.count();
    }

    public void deleteById(Long id) {
        laminanormaRepository.deleteById(id);
    }

    public void delete(LaminaNormaEntity laminanormaEntity) {
        laminanormaRepository.delete(laminanormaEntity);
    }

    public void deleteAll(Iterable<LaminaNormaEntity> laminanormaEntities) {
        laminanormaRepository.deleteAll(laminanormaEntities);
    }

    public void deleteAll() {
        laminanormaRepository.deleteAll();
    }

    public Iterable<LaminaNormaEntity> findAll(Sort sort) {
        return laminanormaRepository.findAll(sort);
    }

}
