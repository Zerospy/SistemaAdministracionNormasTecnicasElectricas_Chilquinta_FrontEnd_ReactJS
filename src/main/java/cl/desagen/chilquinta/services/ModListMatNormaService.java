package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.ModListMatNormaEntity;
import cl.desagen.chilquinta.repositories.ModListMatNormaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ModListMatNormaService {

    @Autowired
    private ModListMatNormaRepository modlistmatnormaRepository;

    public Iterable<ModListMatNormaEntity> findAll() {
        return modlistmatnormaRepository.findAll();
    }

    public Iterable<ModListMatNormaEntity> findAll(Pageable pageable) {
        return modlistmatnormaRepository.findAll(pageable);
    }

    public ModListMatNormaEntity save(ModListMatNormaEntity modlistmatnormaEntity) {
        return modlistmatnormaRepository.save(modlistmatnormaEntity);
    }

    public Iterable<ModListMatNormaEntity> saveAll(Iterable<ModListMatNormaEntity> modlistmatnormaEntities) {
        return modlistmatnormaRepository.saveAll(modlistmatnormaEntities);
    }


    public Optional<ModListMatNormaEntity> findById(Long id) {
        return modlistmatnormaRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return modlistmatnormaRepository.existsById(id);
    }

    public Iterable<ModListMatNormaEntity> findAllById(Iterable<Long> ids) {
        return modlistmatnormaRepository.findAllById(ids);
    }

    public long count() {
        return modlistmatnormaRepository.count();
    }

    public void deleteById(Long id) {
        modlistmatnormaRepository.deleteById(id);
    }

    public void delete(ModListMatNormaEntity modlistmatnormaEntity) {
        modlistmatnormaRepository.delete(modlistmatnormaEntity);
    }

    public void deleteAll(Iterable<ModListMatNormaEntity> modlistmatnormaEntities) {
        modlistmatnormaRepository.deleteAll(modlistmatnormaEntities);
    }

    public void deleteAll() {
        modlistmatnormaRepository.deleteAll();
    }

    public Iterable<ModListMatNormaEntity> findAll(Sort sort) {
        return modlistmatnormaRepository.findAll(sort);
    }

}
