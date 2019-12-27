package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.AccionSistemaEntity;
import cl.desagen.chilquinta.repositories.AccionSistemaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccionSistemaService {

    @Autowired
    private AccionSistemaRepository accionsistemaRepository;

    public Iterable<AccionSistemaEntity> findAll() {
        return accionsistemaRepository.findAll();
    }

    public Iterable<AccionSistemaEntity> findAll(Pageable pageable) {
        return accionsistemaRepository.findAll(pageable);
    }

    public AccionSistemaEntity save(AccionSistemaEntity accionsistemaEntity) {
        return accionsistemaRepository.save(accionsistemaEntity);
    }

    public Iterable<AccionSistemaEntity> saveAll(Iterable<AccionSistemaEntity> accionsistemaEntities) {
        return accionsistemaRepository.saveAll(accionsistemaEntities);
    }


    public Optional<AccionSistemaEntity> findById(Long id) {
        return accionsistemaRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return accionsistemaRepository.existsById(id);
    }

    public Iterable<AccionSistemaEntity> findAllById(Iterable<Long> ids) {
        return accionsistemaRepository.findAllById(ids);
    }

    public long count() {
        return accionsistemaRepository.count();
    }

    public void deleteById(Long id) {
        accionsistemaRepository.deleteById(id);
    }

    public void delete(AccionSistemaEntity accionsistemaEntity) {
        accionsistemaRepository.delete(accionsistemaEntity);
    }

    public void deleteAll(Iterable<AccionSistemaEntity> accionsistemaEntities) {
        accionsistemaRepository.deleteAll(accionsistemaEntities);
    }

    public void deleteAll() {
        accionsistemaRepository.deleteAll();
    }

    public Iterable<AccionSistemaEntity> findAll(Sort sort) {
        return accionsistemaRepository.findAll(sort);
    }

}
