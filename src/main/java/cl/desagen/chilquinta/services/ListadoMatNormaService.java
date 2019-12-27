package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.ListadoMatNormaEntity;
import cl.desagen.chilquinta.repositories.ListadoMatNormaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ListadoMatNormaService {

    @Autowired
    private ListadoMatNormaRepository listadomatnormaRepository;

    public Iterable<ListadoMatNormaEntity> findAll() {
        return listadomatnormaRepository.findAll();
    }

    public Iterable<ListadoMatNormaEntity> findAll(Pageable pageable) {
        return listadomatnormaRepository.findAll(pageable);
    }

    public ListadoMatNormaEntity save(ListadoMatNormaEntity listadomatnormaEntity) {
        return listadomatnormaRepository.save(listadomatnormaEntity);
    }

    public Iterable<ListadoMatNormaEntity> saveAll(Iterable<ListadoMatNormaEntity> listadomatnormaEntities) {
        return listadomatnormaRepository.saveAll(listadomatnormaEntities);
    }


    public Optional<ListadoMatNormaEntity> findById(Long id) {
        return listadomatnormaRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return listadomatnormaRepository.existsById(id);
    }

    public Iterable<ListadoMatNormaEntity> findAllById(Iterable<Long> ids) {
        return listadomatnormaRepository.findAllById(ids);
    }

    public long count() {
        return listadomatnormaRepository.count();
    }

    public void deleteById(Long id) {
        listadomatnormaRepository.deleteById(id);
    }

    public void delete(ListadoMatNormaEntity listadomatnormaEntity) {
        listadomatnormaRepository.delete(listadomatnormaEntity);
    }

    public void deleteAll(Iterable<ListadoMatNormaEntity> listadomatnormaEntities) {
        listadomatnormaRepository.deleteAll(listadomatnormaEntities);
    }

    public void deleteAll() {
        listadomatnormaRepository.deleteAll();
    }

    public Iterable<ListadoMatNormaEntity> findAll(Sort sort) {
        return listadomatnormaRepository.findAll(sort);
    }

}
