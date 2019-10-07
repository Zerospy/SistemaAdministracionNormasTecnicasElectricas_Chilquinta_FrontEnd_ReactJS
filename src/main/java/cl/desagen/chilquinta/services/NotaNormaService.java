package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.NotaNormaEntity;
import cl.desagen.chilquinta.repositories.NotaNormaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NotaNormaService {

    @Autowired
    private NotaNormaRepository notanormaRepository;

    public Iterable<NotaNormaEntity> findAll() {
        return notanormaRepository.findAll();
    }

    public Iterable<NotaNormaEntity> findAll(Pageable pageable) {
        return notanormaRepository.findAll(pageable);
    }

    public NotaNormaEntity save(NotaNormaEntity notanormaEntity) {
        return notanormaRepository.save(notanormaEntity);
    }

    public Iterable<NotaNormaEntity> saveAll(Iterable<NotaNormaEntity> notanormaEntities) {
        return notanormaRepository.saveAll(notanormaEntities);
    }


    public Optional<NotaNormaEntity> findById(Long id) {
        return notanormaRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return notanormaRepository.existsById(id);
    }

    public Iterable<NotaNormaEntity> findAllById(Iterable<Long> ids) {
        return notanormaRepository.findAllById(ids);
    }

    public long count() {
        return notanormaRepository.count();
    }

    public void deleteById(Long id) {
        notanormaRepository.deleteById(id);
    }

    public void delete(NotaNormaEntity notanormaEntity) {
        notanormaRepository.delete(notanormaEntity);
    }

    public void deleteAll(Iterable<NotaNormaEntity> notanormaEntities) {
        notanormaRepository.deleteAll(notanormaEntities);
    }

    public void deleteAll() {
        notanormaRepository.deleteAll();
    }

    public Iterable<NotaNormaEntity> findAll(Sort sort) {
        return notanormaRepository.findAll(sort);
    }

}
