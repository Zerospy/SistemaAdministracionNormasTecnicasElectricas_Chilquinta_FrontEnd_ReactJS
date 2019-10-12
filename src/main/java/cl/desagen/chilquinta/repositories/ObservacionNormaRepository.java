package cl.desagen.chilquinta.repositories;

import cl.desagen.chilquinta.entities.ObservacionNormaEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ObservacionNormaRepository extends PagingAndSortingRepository<ObservacionNormaEntity, Long> {

    Iterable<ObservacionNormaEntity> findAllByNormaId(Long normaId);
}
