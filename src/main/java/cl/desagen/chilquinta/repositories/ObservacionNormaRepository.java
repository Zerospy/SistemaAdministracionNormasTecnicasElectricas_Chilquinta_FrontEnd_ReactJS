package cl.desagen.chilquinta.repositories;

import cl.desagen.chilquinta.entities.ObservacionNormaEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ObservacionNormaRepository extends PagingAndSortingRepository<ObservacionNormaEntity, Integer> {

    Iterable<ObservacionNormaEntity> findAllByNormaEntityId(Integer normaId);

    @Query("SELECT o FROM ObservacionNormaEntity o WHERE o.normaEntity.id IN (:normaIds)")
    Iterable<ObservacionNormaEntity> findAllByNormaEntityIdIn(@Param("normaIds") List<Integer> normaIds);

    @Query("SELECT o.normaEntity.id FROM ObservacionNormaEntity o GROUP BY o.normaEntity.id")
    List<Integer> getIdsNormasWithComments();
}
