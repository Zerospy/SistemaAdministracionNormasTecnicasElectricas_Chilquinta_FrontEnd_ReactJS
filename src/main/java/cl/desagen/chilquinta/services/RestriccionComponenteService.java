package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.RestriccionComponenteEntity;
import cl.desagen.chilquinta.repositories.RestriccionComponenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RestriccionComponenteService {

    @Autowired
    private RestriccionComponenteRepository restriccioncomponenteRepository;

    public Iterable<RestriccionComponenteEntity> findAll() {
        return restriccioncomponenteRepository.findAll();
    }

    public Iterable<RestriccionComponenteEntity> findAll(Pageable pageable) {
        return restriccioncomponenteRepository.findAll(pageable);
    }

    public RestriccionComponenteEntity save(RestriccionComponenteEntity restriccioncomponenteEntity) {
        return restriccioncomponenteRepository.save(restriccioncomponenteEntity);
    }

    public Iterable<RestriccionComponenteEntity> saveAll(Iterable<RestriccionComponenteEntity> restriccioncomponenteEntities) {
        return restriccioncomponenteRepository.saveAll(restriccioncomponenteEntities);
    }


    public Optional<RestriccionComponenteEntity> findById(Long id) {
        return restriccioncomponenteRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return restriccioncomponenteRepository.existsById(id);
    }

    public Iterable<RestriccionComponenteEntity> findAllById(Iterable<Long> ids) {
        return restriccioncomponenteRepository.findAllById(ids);
    }

    public long count() {
        return restriccioncomponenteRepository.count();
    }

    public void deleteById(Long id) {
        restriccioncomponenteRepository.deleteById(id);
    }

    public void delete(RestriccionComponenteEntity restriccioncomponenteEntity) {
        restriccioncomponenteRepository.delete(restriccioncomponenteEntity);
    }

    public void deleteAll(Iterable<RestriccionComponenteEntity> restriccioncomponenteEntities) {
        restriccioncomponenteRepository.deleteAll(restriccioncomponenteEntities);
    }

    public void deleteAll() {
        restriccioncomponenteRepository.deleteAll();
    }

    public Iterable<RestriccionComponenteEntity> findAll(Sort sort) {
        return restriccioncomponenteRepository.findAll(sort);
    }

}
