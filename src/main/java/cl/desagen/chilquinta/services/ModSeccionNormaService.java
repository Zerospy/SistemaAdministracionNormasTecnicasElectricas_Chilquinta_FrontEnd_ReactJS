package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.ModSeccionNormaEntity;
import cl.desagen.chilquinta.repositories.ModSeccionNormaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ModSeccionNormaService {

    @Autowired
    private ModSeccionNormaRepository modseccionnormaRepository;

    public Iterable<ModSeccionNormaEntity> findAll() {
        return modseccionnormaRepository.findAll();
    }

    public Iterable<ModSeccionNormaEntity> findAll(Pageable pageable) {
        return modseccionnormaRepository.findAll(pageable);
    }

    public ModSeccionNormaEntity save(ModSeccionNormaEntity modseccionnormaEntity) {
        return modseccionnormaRepository.save(modseccionnormaEntity);
    }

    public Iterable<ModSeccionNormaEntity> saveAll(Iterable<ModSeccionNormaEntity> modseccionnormaEntities) {
        return modseccionnormaRepository.saveAll(modseccionnormaEntities);
    }


    public Optional<ModSeccionNormaEntity> findById(Long id) {
        return modseccionnormaRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return modseccionnormaRepository.existsById(id);
    }

    public Iterable<ModSeccionNormaEntity> findAllById(Iterable<Long> ids) {
        return modseccionnormaRepository.findAllById(ids);
    }

    public long count() {
        return modseccionnormaRepository.count();
    }

    public void deleteById(Long id) {
        modseccionnormaRepository.deleteById(id);
    }

    public void delete(ModSeccionNormaEntity modseccionnormaEntity) {
        modseccionnormaRepository.delete(modseccionnormaEntity);
    }

    public void deleteAll(Iterable<ModSeccionNormaEntity> modseccionnormaEntities) {
        modseccionnormaRepository.deleteAll(modseccionnormaEntities);
    }

    public void deleteAll() {
        modseccionnormaRepository.deleteAll();
    }

    public Iterable<ModSeccionNormaEntity> findAll(Sort sort) {
        return modseccionnormaRepository.findAll(sort);
    }

}
