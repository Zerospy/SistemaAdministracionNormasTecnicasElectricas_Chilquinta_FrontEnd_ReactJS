package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.EtiquetaNormaEntity;
import cl.desagen.chilquinta.repositories.EtiquetaNormaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EtiquetaNormaService {

    @Autowired
    private EtiquetaNormaRepository etiquetanormaRepository;

    public Iterable<EtiquetaNormaEntity> findAll() {
        return etiquetanormaRepository.findAll();
    }

    public Iterable<EtiquetaNormaEntity> findAll(Pageable pageable) {
        return etiquetanormaRepository.findAll(pageable);
    }

    public EtiquetaNormaEntity save(EtiquetaNormaEntity etiquetanormaEntity) {
        return etiquetanormaRepository.save(etiquetanormaEntity);
    }

    public Iterable<EtiquetaNormaEntity> saveAll(Iterable<EtiquetaNormaEntity> etiquetanormaEntities) {
        return etiquetanormaRepository.saveAll(etiquetanormaEntities);
    }


    public Optional<EtiquetaNormaEntity> findById(Long id) {
        return etiquetanormaRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return etiquetanormaRepository.existsById(id);
    }

    public Iterable<EtiquetaNormaEntity> findAllById(Iterable<Long> ids) {
        return etiquetanormaRepository.findAllById(ids);
    }

    public long count() {
        return etiquetanormaRepository.count();
    }

    public void deleteById(Long id) {
        etiquetanormaRepository.deleteById(id);
    }

    public void delete(EtiquetaNormaEntity etiquetanormaEntity) {
        etiquetanormaRepository.delete(etiquetanormaEntity);
    }

    public void deleteAll(Iterable<EtiquetaNormaEntity> etiquetanormaEntities) {
        etiquetanormaRepository.deleteAll(etiquetanormaEntities);
    }

    public void deleteAll() {
        etiquetanormaRepository.deleteAll();
    }

    public Iterable<EtiquetaNormaEntity> findAll(Sort sort) {
        return etiquetanormaRepository.findAll(sort);
    }

}
