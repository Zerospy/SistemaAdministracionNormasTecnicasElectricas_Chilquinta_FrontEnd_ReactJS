package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.EtiquetaEntity;
import cl.desagen.chilquinta.repositories.EtiquetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EtiquetaService {

    @Autowired
    private EtiquetaRepository etiquetaRepository;

    public Iterable<EtiquetaEntity> findAll() {
        return etiquetaRepository.findAll();
    }

    public Iterable<EtiquetaEntity> findAll(Pageable pageable) {
        return etiquetaRepository.findAll(pageable);
    }

    public EtiquetaEntity save(EtiquetaEntity etiquetaEntity) {
        return etiquetaRepository.save(etiquetaEntity);
    }

    public Iterable<EtiquetaEntity> saveAll(Iterable<EtiquetaEntity> etiquetaEntities) {
        return etiquetaRepository.saveAll(etiquetaEntities);
    }


    public Optional<EtiquetaEntity> findById(Long id) {
        return etiquetaRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return etiquetaRepository.existsById(id);
    }

    public Iterable<EtiquetaEntity> findAllById(Iterable<Long> ids) {
        return etiquetaRepository.findAllById(ids);
    }

    public long count() {
        return etiquetaRepository.count();
    }

    public void deleteById(Long id) {
        etiquetaRepository.deleteById(id);
    }

    public void delete(EtiquetaEntity etiquetaEntity) {
        etiquetaRepository.delete(etiquetaEntity);
    }

    public void deleteAll(Iterable<EtiquetaEntity> etiquetaEntities) {
        etiquetaRepository.deleteAll(etiquetaEntities);
    }

    public void deleteAll() {
        etiquetaRepository.deleteAll();
    }

    public Iterable<EtiquetaEntity> findAll(Sort sort) {
        return etiquetaRepository.findAll(sort);
    }

}
