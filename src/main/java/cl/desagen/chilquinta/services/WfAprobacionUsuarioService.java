package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.WfAprobacionUsuarioEntity;
import cl.desagen.chilquinta.repositories.WfAprobacionUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WfAprobacionUsuarioService {

    @Autowired
    private WfAprobacionUsuarioRepository wfaprobacionusuarioRepository;

    public Iterable<WfAprobacionUsuarioEntity> findAll() {
        return wfaprobacionusuarioRepository.findAll();
    }

    public Iterable<WfAprobacionUsuarioEntity> findAll(Pageable pageable) {
        return wfaprobacionusuarioRepository.findAll(pageable);
    }

    public WfAprobacionUsuarioEntity save(WfAprobacionUsuarioEntity wfaprobacionusuarioEntity) {
        return wfaprobacionusuarioRepository.save(wfaprobacionusuarioEntity);
    }

    public Iterable<WfAprobacionUsuarioEntity> saveAll(Iterable<WfAprobacionUsuarioEntity> wfaprobacionusuarioEntities) {
        return wfaprobacionusuarioRepository.saveAll(wfaprobacionusuarioEntities);
    }


    public Optional<WfAprobacionUsuarioEntity> findById(Long id) {
        return wfaprobacionusuarioRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return wfaprobacionusuarioRepository.existsById(id);
    }

    public Iterable<WfAprobacionUsuarioEntity> findAllById(Iterable<Long> ids) {
        return wfaprobacionusuarioRepository.findAllById(ids);
    }

    public long count() {
        return wfaprobacionusuarioRepository.count();
    }

    public void deleteById(Long id) {
        wfaprobacionusuarioRepository.deleteById(id);
    }

    public void delete(WfAprobacionUsuarioEntity wfaprobacionusuarioEntity) {
        wfaprobacionusuarioRepository.delete(wfaprobacionusuarioEntity);
    }

    public void deleteAll(Iterable<WfAprobacionUsuarioEntity> wfaprobacionusuarioEntities) {
        wfaprobacionusuarioRepository.deleteAll(wfaprobacionusuarioEntities);
    }

    public void deleteAll() {
        wfaprobacionusuarioRepository.deleteAll();
    }

    public Iterable<WfAprobacionUsuarioEntity> findAll(Sort sort) {
        return wfaprobacionusuarioRepository.findAll(sort);
    }

}
