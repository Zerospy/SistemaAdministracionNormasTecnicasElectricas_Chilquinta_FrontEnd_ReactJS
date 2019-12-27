package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.ModListMatCompEntity;
import cl.desagen.chilquinta.repositories.ModListMatCompRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ModListMatCompService {

    @Autowired
    private ModListMatCompRepository modlistmatcompRepository;

    public Iterable<ModListMatCompEntity> findAll() {
        return modlistmatcompRepository.findAll();
    }

    public Iterable<ModListMatCompEntity> findAll(Pageable pageable) {
        return modlistmatcompRepository.findAll(pageable);
    }

    public ModListMatCompEntity save(ModListMatCompEntity modlistmatcompEntity) {
        return modlistmatcompRepository.save(modlistmatcompEntity);
    }

    public Iterable<ModListMatCompEntity> saveAll(Iterable<ModListMatCompEntity> modlistmatcompEntities) {
        return modlistmatcompRepository.saveAll(modlistmatcompEntities);
    }


    public Optional<ModListMatCompEntity> findById(Long id) {
        return modlistmatcompRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return modlistmatcompRepository.existsById(id);
    }

    public Iterable<ModListMatCompEntity> findAllById(Iterable<Long> ids) {
        return modlistmatcompRepository.findAllById(ids);
    }

    public long count() {
        return modlistmatcompRepository.count();
    }

    public void deleteById(Long id) {
        modlistmatcompRepository.deleteById(id);
    }

    public void delete(ModListMatCompEntity modlistmatcompEntity) {
        modlistmatcompRepository.delete(modlistmatcompEntity);
    }

    public void deleteAll(Iterable<ModListMatCompEntity> modlistmatcompEntities) {
        modlistmatcompRepository.deleteAll(modlistmatcompEntities);
    }

    public void deleteAll() {
        modlistmatcompRepository.deleteAll();
    }

    public Iterable<ModListMatCompEntity> findAll(Sort sort) {
        return modlistmatcompRepository.findAll(sort);
    }

}
