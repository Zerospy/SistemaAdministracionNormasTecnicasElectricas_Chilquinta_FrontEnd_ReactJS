package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.WfAprobacionEntity;
import cl.desagen.chilquinta.repositories.WfAprobacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WfAprobacionService {

    @Autowired
    private WfAprobacionRepository wfaprobacionRepository;

    public Iterable<WfAprobacionEntity> findAll() {
        return wfaprobacionRepository.findAll();
    }

    public Iterable<WfAprobacionEntity> findAll(Pageable pageable) {
        return wfaprobacionRepository.findAll(pageable);
    }

    public WfAprobacionEntity save(WfAprobacionEntity wfaprobacionEntity) {
        return wfaprobacionRepository.save(wfaprobacionEntity);
    }

    public Iterable<WfAprobacionEntity> saveAll(Iterable<WfAprobacionEntity> wfaprobacionEntities) {
        return wfaprobacionRepository.saveAll(wfaprobacionEntities);
    }


    public Optional<WfAprobacionEntity> findById(Long id) {
        return wfaprobacionRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return wfaprobacionRepository.existsById(id);
    }

    public Iterable<WfAprobacionEntity> findAllById(Iterable<Long> ids) {
        return wfaprobacionRepository.findAllById(ids);
    }

    public long count() {
        return wfaprobacionRepository.count();
    }

    public void deleteById(Long id) {
        wfaprobacionRepository.deleteById(id);
    }

    public void delete(WfAprobacionEntity wfaprobacionEntity) {
        wfaprobacionRepository.delete(wfaprobacionEntity);
    }

    public void deleteAll(Iterable<WfAprobacionEntity> wfaprobacionEntities) {
        wfaprobacionRepository.deleteAll(wfaprobacionEntities);
    }

    public void deleteAll() {
        wfaprobacionRepository.deleteAll();
    }

    public Iterable<WfAprobacionEntity> findAll(Sort sort) {
        return wfaprobacionRepository.findAll(sort);
    }

}
