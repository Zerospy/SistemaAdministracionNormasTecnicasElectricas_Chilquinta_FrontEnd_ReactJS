package cl.desagen.chilquinta.repositories;

import cl.desagen.chilquinta.entities.NormaEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface NormaRepository extends PagingAndSortingRepository<NormaEntity, Integer> {

    @Modifying
    @Query("UPDATE NormaEntity NE SET NE.downloadCounter = NE.downloadCounter + 1")
    void increaseCounterNormaEntity(Integer normaId);

}
