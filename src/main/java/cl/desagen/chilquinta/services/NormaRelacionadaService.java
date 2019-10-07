package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.NormaRelacionadaEntity;
import cl.desagen.chilquinta.repositories.NormaRelacionadaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NormaRelacionadaService {

    @Autowired
    private NormaRelacionadaRepository normarelacionadaRepository;

    public Iterable<NormaRelacionadaEntity> findAll() {
        return normarelacionadaRepository.findAll();
    }

    public Iterable<NormaRelacionadaEntity> findAll(Pageable pageable) {
        return normarelacionadaRepository.findAll(pageable);
    }

    public NormaRelacionadaEntity save(NormaRelacionadaEntity normarelacionadaEntity) {
        return normarelacionadaRepository.save(normarelacionadaEntity);
    }

    public Iterable<NormaRelacionadaEntity> saveAll(Iterable<NormaRelacionadaEntity> normarelacionadaEntities) {
        return normarelacionadaRepository.saveAll(normarelacionadaEntities);
    }


    public Optional<NormaRelacionadaEntity> findById(Long id) {
        return normarelacionadaRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return normarelacionadaRepository.existsById(id);
    }

    public Iterable<NormaRelacionadaEntity> findAllById(Iterable<Long> ids) {
        return normarelacionadaRepository.findAllById(ids);
    }

    public long count() {
        return normarelacionadaRepository.count();
    }

    public void deleteById(Long id) {
        normarelacionadaRepository.deleteById(id);
    }

    public void delete(NormaRelacionadaEntity normarelacionadaEntity) {
        normarelacionadaRepository.delete(normarelacionadaEntity);
    }

    public void deleteAll(Iterable<NormaRelacionadaEntity> normarelacionadaEntities) {
        normarelacionadaRepository.deleteAll(normarelacionadaEntities);
    }

    public void deleteAll() {
        normarelacionadaRepository.deleteAll();
    }

    public Iterable<NormaRelacionadaEntity> findAll(Sort sort) {
        return normarelacionadaRepository.findAll(sort);
    }

}
