package cl.desagen.chilquinta.repositories;

import cl.desagen.chilquinta.entities.ObservacionNormaEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface ObservacionNormaRepository extends PagingAndSortingRepository<ObservacionNormaEntity, Long> {

    Iterable<ObservacionNormaEntity> findAllByNormaId(Integer normaId);

    @Query("SELECT o.normaId FROM ObservacionNormaEntity o GROUP BY o.normaId")
    List<Integer> getIdsNormasWithComments();
}
