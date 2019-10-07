package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.ComentarioNormaEntity;
import cl.desagen.chilquinta.repositories.ComentarioNormaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ComentarioNormaService {

    @Autowired
    private ComentarioNormaRepository comentarionormaRepository;

    public Iterable<ComentarioNormaEntity> findAll() {
        return comentarionormaRepository.findAll();
    }

    public Iterable<ComentarioNormaEntity> findAll(Pageable pageable) {
        return comentarionormaRepository.findAll(pageable);
    }

    public ComentarioNormaEntity save(ComentarioNormaEntity comentarionormaEntity) {
        return comentarionormaRepository.save(comentarionormaEntity);
    }

    public Iterable<ComentarioNormaEntity> saveAll(Iterable<ComentarioNormaEntity> comentarionormaEntities) {
        return comentarionormaRepository.saveAll(comentarionormaEntities);
    }


    public Optional<ComentarioNormaEntity> findById(Long id) {
        return comentarionormaRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return comentarionormaRepository.existsById(id);
    }

    public Iterable<ComentarioNormaEntity> findAllById(Iterable<Long> ids) {
        return comentarionormaRepository.findAllById(ids);
    }

    public long count() {
        return comentarionormaRepository.count();
    }

    public void deleteById(Long id) {
        comentarionormaRepository.deleteById(id);
    }

    public void delete(ComentarioNormaEntity comentarionormaEntity) {
        comentarionormaRepository.delete(comentarionormaEntity);
    }

    public void deleteAll(Iterable<ComentarioNormaEntity> comentarionormaEntities) {
        comentarionormaRepository.deleteAll(comentarionormaEntities);
    }

    public void deleteAll() {
        comentarionormaRepository.deleteAll();
    }

    public Iterable<ComentarioNormaEntity> findAll(Sort sort) {
        return comentarionormaRepository.findAll(sort);
    }

}
