package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.SysdiagramsEntity;
import cl.desagen.chilquinta.repositories.SysdiagramsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SysdiagramsService {

    @Autowired
    private SysdiagramsRepository sysdiagramsRepository;

    public Iterable<SysdiagramsEntity> findAll() {
        return sysdiagramsRepository.findAll();
    }

    public Iterable<SysdiagramsEntity> findAll(Pageable pageable) {
        return sysdiagramsRepository.findAll(pageable);
    }

    public SysdiagramsEntity save(SysdiagramsEntity sysdiagramsEntity) {
        return sysdiagramsRepository.save(sysdiagramsEntity);
    }

    public Iterable<SysdiagramsEntity> saveAll(Iterable<SysdiagramsEntity> sysdiagramsEntities) {
        return sysdiagramsRepository.saveAll(sysdiagramsEntities);
    }


    public Optional<SysdiagramsEntity> findById(Long id) {
        return sysdiagramsRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return sysdiagramsRepository.existsById(id);
    }

    public Iterable<SysdiagramsEntity> findAllById(Iterable<Long> ids) {
        return sysdiagramsRepository.findAllById(ids);
    }

    public long count() {
        return sysdiagramsRepository.count();
    }

    public void deleteById(Long id) {
        sysdiagramsRepository.deleteById(id);
    }

    public void delete(SysdiagramsEntity sysdiagramsEntity) {
        sysdiagramsRepository.delete(sysdiagramsEntity);
    }

    public void deleteAll(Iterable<SysdiagramsEntity> sysdiagramsEntities) {
        sysdiagramsRepository.deleteAll(sysdiagramsEntities);
    }

    public void deleteAll() {
        sysdiagramsRepository.deleteAll();
    }

    public Iterable<SysdiagramsEntity> findAll(Sort sort) {
        return sysdiagramsRepository.findAll(sort);
    }

}
