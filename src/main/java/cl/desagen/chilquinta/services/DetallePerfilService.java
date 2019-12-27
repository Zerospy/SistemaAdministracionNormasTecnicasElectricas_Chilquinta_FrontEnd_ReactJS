package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.DetallePerfilEntity;
import cl.desagen.chilquinta.repositories.DetallePerfilRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DetallePerfilService {

    @Autowired
    private DetallePerfilRepository detalleperfilRepository;

    public Iterable<DetallePerfilEntity> findAll() {
        return detalleperfilRepository.findAll();
    }

    public Iterable<DetallePerfilEntity> findAll(Pageable pageable) {
        return detalleperfilRepository.findAll(pageable);
    }

    public DetallePerfilEntity save(DetallePerfilEntity detalleperfilEntity) {
        return detalleperfilRepository.save(detalleperfilEntity);
    }

    public Iterable<DetallePerfilEntity> saveAll(Iterable<DetallePerfilEntity> detalleperfilEntities) {
        return detalleperfilRepository.saveAll(detalleperfilEntities);
    }


    public Optional<DetallePerfilEntity> findById(Long id) {
        return detalleperfilRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return detalleperfilRepository.existsById(id);
    }

    public Iterable<DetallePerfilEntity> findAllById(Iterable<Long> ids) {
        return detalleperfilRepository.findAllById(ids);
    }

    public long count() {
        return detalleperfilRepository.count();
    }

    public void deleteById(Long id) {
        detalleperfilRepository.deleteById(id);
    }

    public void delete(DetallePerfilEntity detalleperfilEntity) {
        detalleperfilRepository.delete(detalleperfilEntity);
    }

    public void deleteAll(Iterable<DetallePerfilEntity> detalleperfilEntities) {
        detalleperfilRepository.deleteAll(detalleperfilEntities);
    }

    public void deleteAll() {
        detalleperfilRepository.deleteAll();
    }

    public Iterable<DetallePerfilEntity> findAll(Sort sort) {
        return detalleperfilRepository.findAll(sort);
    }

}
