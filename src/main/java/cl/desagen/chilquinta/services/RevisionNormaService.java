package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.RevisionNormaEntity;
import cl.desagen.chilquinta.repositories.RevisionNormaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RevisionNormaService {

    @Autowired
    private RevisionNormaRepository revisionnormaRepository;

    public Iterable<RevisionNormaEntity> findAll() {
        return revisionnormaRepository.findAll();
    }

    public Iterable<RevisionNormaEntity> findAll(Pageable pageable) {
        return revisionnormaRepository.findAll(pageable);
    }

    public RevisionNormaEntity save(RevisionNormaEntity revisionnormaEntity) {
        return revisionnormaRepository.save(revisionnormaEntity);
    }

    public Iterable<RevisionNormaEntity> saveAll(Iterable<RevisionNormaEntity> revisionnormaEntities) {
        return revisionnormaRepository.saveAll(revisionnormaEntities);
    }


    public Optional<RevisionNormaEntity> findById(Long id) {
        return revisionnormaRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return revisionnormaRepository.existsById(id);
    }

    public Iterable<RevisionNormaEntity> findAllById(Iterable<Long> ids) {
        return revisionnormaRepository.findAllById(ids);
    }

    public long count() {
        return revisionnormaRepository.count();
    }

    public void deleteById(Long id) {
        revisionnormaRepository.deleteById(id);
    }

    public void delete(RevisionNormaEntity revisionnormaEntity) {
        revisionnormaRepository.delete(revisionnormaEntity);
    }

    public void deleteAll(Iterable<RevisionNormaEntity> revisionnormaEntities) {
        revisionnormaRepository.deleteAll(revisionnormaEntities);
    }

    public void deleteAll() {
        revisionnormaRepository.deleteAll();
    }

    public Iterable<RevisionNormaEntity> findAll(Sort sort) {
        return revisionnormaRepository.findAll(sort);
    }

}
