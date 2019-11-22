package cl.desagen.chilquinta.repositories;

import cl.desagen.chilquinta.entities.ObservacionNormaEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface ObservacionNormaRepository extends PagingAndSortingRepository<ObservacionNormaEntity, Long> {

    Iterable<ObservacionNormaEntity> findAllByNormaEntityId(Integer normaId);

    @Query("SELECT o.normaEntity.id FROM ObservacionNormaEntity o GROUP BY o.normaEntity.id")
    List<Integer> getIdsNormasWithComments();
}
