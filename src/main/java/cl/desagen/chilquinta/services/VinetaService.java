package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.VinetaEntity;
import cl.desagen.chilquinta.repositories.VinetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VinetaService {

    @Autowired
    private VinetaRepository vinetaRepository;

    public Iterable<VinetaEntity> findAll() {
        return vinetaRepository.findAll();
    }

    public Iterable<VinetaEntity> findAll(Pageable pageable) {
        return vinetaRepository.findAll(pageable);
    }

    public VinetaEntity save(VinetaEntity vinetaEntity) {
        return vinetaRepository.save(vinetaEntity);
    }

    public Iterable<VinetaEntity> saveAll(Iterable<VinetaEntity> vinetaEntities) {
        return vinetaRepository.saveAll(vinetaEntities);
    }


    public Optional<VinetaEntity> findById(Long id) {
        return vinetaRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return vinetaRepository.existsById(id);
    }

    public Iterable<VinetaEntity> findAllById(Iterable<Long> ids) {
        return vinetaRepository.findAllById(ids);
    }

    public long count() {
        return vinetaRepository.count();
    }

    public void deleteById(Long id) {
        vinetaRepository.deleteById(id);
    }

    public void delete(VinetaEntity vinetaEntity) {
        vinetaRepository.delete(vinetaEntity);
    }

    public void deleteAll(Iterable<VinetaEntity> vinetaEntities) {
        vinetaRepository.deleteAll(vinetaEntities);
    }

    public void deleteAll() {
        vinetaRepository.deleteAll();
    }

    public Iterable<VinetaEntity> findAll(Sort sort) {
        return vinetaRepository.findAll(sort);
    }

}
