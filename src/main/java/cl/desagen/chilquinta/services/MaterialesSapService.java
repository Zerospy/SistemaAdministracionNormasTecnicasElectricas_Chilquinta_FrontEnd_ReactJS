package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.MaterialesSapEntity;
import cl.desagen.chilquinta.repositories.MaterialesSapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MaterialesSapService {

    @Autowired
    private MaterialesSapRepository materialessapRepository;

    public Iterable<MaterialesSapEntity> findAll() {
        return materialessapRepository.findAll();
    }

    public Iterable<MaterialesSapEntity> findAll(Pageable pageable) {
        return materialessapRepository.findAll(pageable);
    }

    public MaterialesSapEntity save(MaterialesSapEntity materialessapEntity) {
        return materialessapRepository.save(materialessapEntity);
    }

    public Iterable<MaterialesSapEntity> saveAll(Iterable<MaterialesSapEntity> materialessapEntities) {
        return materialessapRepository.saveAll(materialessapEntities);
    }


    public Optional<MaterialesSapEntity> findById(Long id) {
        return materialessapRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return materialessapRepository.existsById(id);
    }

    public Iterable<MaterialesSapEntity> findAllById(Iterable<Long> ids) {
        return materialessapRepository.findAllById(ids);
    }

    public long count() {
        return materialessapRepository.count();
    }

    public void deleteById(Long id) {
        materialessapRepository.deleteById(id);
    }

    public void delete(MaterialesSapEntity materialessapEntity) {
        materialessapRepository.delete(materialessapEntity);
    }

    public void deleteAll(Iterable<MaterialesSapEntity> materialessapEntities) {
        materialessapRepository.deleteAll(materialessapEntities);
    }

    public void deleteAll() {
        materialessapRepository.deleteAll();
    }

    public Iterable<MaterialesSapEntity> findAll(Sort sort) {
        return materialessapRepository.findAll(sort);
    }

}
