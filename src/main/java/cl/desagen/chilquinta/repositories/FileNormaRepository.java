package cl.desagen.chilquinta.repositories;

import cl.desagen.chilquinta.entities.FileNormaEntity;
import cl.desagen.chilquinta.enums.FileExtension;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

public interface FileNormaRepository extends PagingAndSortingRepository<FileNormaEntity, Long> {

    Optional<FileNormaEntity> findByNormaEntityIdAndFileExtension(Integer id, FileExtension fileExtension);

    @Query("SELECT f.normaEntity.id FROM FileNormaEntity f GROUP BY f.normaEntity.id")
    List<Integer> getIdsNormasWithFiles();

}
