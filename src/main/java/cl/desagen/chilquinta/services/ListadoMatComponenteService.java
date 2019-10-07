package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.ListadoMatComponenteEntity;
import cl.desagen.chilquinta.repositories.ListadoMatComponenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ListadoMatComponenteService {

    @Autowired
    private ListadoMatComponenteRepository listadomatcomponenteRepository;

    public Iterable<ListadoMatComponenteEntity> findAll() {
        return listadomatcomponenteRepository.findAll();
    }

    public Iterable<ListadoMatComponenteEntity> findAll(Pageable pageable) {
        return listadomatcomponenteRepository.findAll(pageable);
    }

    public ListadoMatComponenteEntity save(ListadoMatComponenteEntity listadomatcomponenteEntity) {
        return listadomatcomponenteRepository.save(listadomatcomponenteEntity);
    }

    public Iterable<ListadoMatComponenteEntity> saveAll(Iterable<ListadoMatComponenteEntity> listadomatcomponenteEntities) {
        return listadomatcomponenteRepository.saveAll(listadomatcomponenteEntities);
    }


    public Optional<ListadoMatComponenteEntity> findById(Long id) {
        return listadomatcomponenteRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return listadomatcomponenteRepository.existsById(id);
    }

    public Iterable<ListadoMatComponenteEntity> findAllById(Iterable<Long> ids) {
        return listadomatcomponenteRepository.findAllById(ids);
    }

    public long count() {
        return listadomatcomponenteRepository.count();
    }

    public void deleteById(Long id) {
        listadomatcomponenteRepository.deleteById(id);
    }

    public void delete(ListadoMatComponenteEntity listadomatcomponenteEntity) {
        listadomatcomponenteRepository.delete(listadomatcomponenteEntity);
    }

    public void deleteAll(Iterable<ListadoMatComponenteEntity> listadomatcomponenteEntities) {
        listadomatcomponenteRepository.deleteAll(listadomatcomponenteEntities);
    }

    public void deleteAll() {
        listadomatcomponenteRepository.deleteAll();
    }

    public Iterable<ListadoMatComponenteEntity> findAll(Sort sort) {
        return listadomatcomponenteRepository.findAll(sort);
    }

}
