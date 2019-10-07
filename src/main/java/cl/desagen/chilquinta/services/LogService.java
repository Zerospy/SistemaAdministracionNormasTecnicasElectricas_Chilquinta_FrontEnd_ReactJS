package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.LogEntity;
import cl.desagen.chilquinta.repositories.LogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LogService {

    @Autowired
    private LogRepository logRepository;

    public Iterable<LogEntity> findAll() {
        return logRepository.findAll();
    }

    public Iterable<LogEntity> findAll(Pageable pageable) {
        return logRepository.findAll(pageable);
    }

    public LogEntity save(LogEntity logEntity) {
        return logRepository.save(logEntity);
    }

    public Iterable<LogEntity> saveAll(Iterable<LogEntity> logEntities) {
        return logRepository.saveAll(logEntities);
    }


    public Optional<LogEntity> findById(Long id) {
        return logRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return logRepository.existsById(id);
    }

    public Iterable<LogEntity> findAllById(Iterable<Long> ids) {
        return logRepository.findAllById(ids);
    }

    public long count() {
        return logRepository.count();
    }

    public void deleteById(Long id) {
        logRepository.deleteById(id);
    }

    public void delete(LogEntity logEntity) {
        logRepository.delete(logEntity);
    }

    public void deleteAll(Iterable<LogEntity> logEntities) {
        logRepository.deleteAll(logEntities);
    }

    public void deleteAll() {
        logRepository.deleteAll();
    }

    public Iterable<LogEntity> findAll(Sort sort) {
        return logRepository.findAll(sort);
    }

}
