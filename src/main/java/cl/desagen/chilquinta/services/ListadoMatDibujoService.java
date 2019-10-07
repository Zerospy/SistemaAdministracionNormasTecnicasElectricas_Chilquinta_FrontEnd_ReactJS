package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.ListadoMatDibujoEntity;
import cl.desagen.chilquinta.repositories.ListadoMatDibujoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ListadoMatDibujoService {

    @Autowired
    private ListadoMatDibujoRepository listadomatdibujoRepository;

    public Iterable<ListadoMatDibujoEntity> findAll() {
        return listadomatdibujoRepository.findAll();
    }

    public Iterable<ListadoMatDibujoEntity> findAll(Pageable pageable) {
        return listadomatdibujoRepository.findAll(pageable);
    }

    public ListadoMatDibujoEntity save(ListadoMatDibujoEntity listadomatdibujoEntity) {
        return listadomatdibujoRepository.save(listadomatdibujoEntity);
    }

    public Iterable<ListadoMatDibujoEntity> saveAll(Iterable<ListadoMatDibujoEntity> listadomatdibujoEntities) {
        return listadomatdibujoRepository.saveAll(listadomatdibujoEntities);
    }


    public Optional<ListadoMatDibujoEntity> findById(Long id) {
        return listadomatdibujoRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return listadomatdibujoRepository.existsById(id);
    }

    public Iterable<ListadoMatDibujoEntity> findAllById(Iterable<Long> ids) {
        return listadomatdibujoRepository.findAllById(ids);
    }

    public long count() {
        return listadomatdibujoRepository.count();
    }

    public void deleteById(Long id) {
        listadomatdibujoRepository.deleteById(id);
    }

    public void delete(ListadoMatDibujoEntity listadomatdibujoEntity) {
        listadomatdibujoRepository.delete(listadomatdibujoEntity);
    }

    public void deleteAll(Iterable<ListadoMatDibujoEntity> listadomatdibujoEntities) {
        listadomatdibujoRepository.deleteAll(listadomatdibujoEntities);
    }

    public void deleteAll() {
        listadomatdibujoRepository.deleteAll();
    }

    public Iterable<ListadoMatDibujoEntity> findAll(Sort sort) {
        return listadomatdibujoRepository.findAll(sort);
    }

}
