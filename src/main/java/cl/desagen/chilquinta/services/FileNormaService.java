package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.FileNormaEntity;
import cl.desagen.chilquinta.enums.FileExtension;
import cl.desagen.chilquinta.repositories.FileNormaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FileNormaService {

    @Autowired
    private FileNormaRepository filenormaRepository;

    public Iterable<FileNormaEntity> findAll() {
        return filenormaRepository.findAll();
    }

    public Iterable<FileNormaEntity> findAll(Pageable pageable) {
        return filenormaRepository.findAll(pageable);
    }

    public FileNormaEntity save(FileNormaEntity filenormaEntity) {
        return filenormaRepository.save(filenormaEntity);
    }

    public Iterable<FileNormaEntity> saveAll(Iterable<FileNormaEntity> filenormaEntities) {
        return filenormaRepository.saveAll(filenormaEntities);
    }


    public Optional<FileNormaEntity> findById(Long id) {
        return filenormaRepository.findById(id);
    }

    public Optional<FileNormaEntity> findByNormaIdAndFileExtension(Integer id, FileExtension fileExtension) {
        return filenormaRepository.findByNormaEntityIdAndFileExtension(id, fileExtension);
    }

    public boolean existsById(Long id) {
        return filenormaRepository.existsById(id);
    }

    public Iterable<FileNormaEntity> findAllById(Iterable<Long> ids) {
        return filenormaRepository.findAllById(ids);
    }

    public long count() {
        return filenormaRepository.count();
    }

    public void deleteById(Long id) {
        filenormaRepository.deleteById(id);
    }

    public void delete(FileNormaEntity filenormaEntity) {
        filenormaRepository.delete(filenormaEntity);
    }

    public void deleteAll(Iterable<FileNormaEntity> filenormaEntities) {
        filenormaRepository.deleteAll(filenormaEntities);
    }

    public void deleteAll() {
        filenormaRepository.deleteAll();
    }

    public Iterable<FileNormaEntity> findAll(Sort sort) {
        return filenormaRepository.findAll(sort);
    }

}