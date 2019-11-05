package cl.desagen.chilquinta.repositories;

import cl.desagen.chilquinta.entities.FileNormaEntity;
import cl.desagen.chilquinta.enums.FileExtension;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface FileNormaRepository extends PagingAndSortingRepository<FileNormaEntity, Long> {

    Optional<FileNormaEntity> findByNormaEntityIdAndFileExtension(Integer id, FileExtension fileExtension);

}
