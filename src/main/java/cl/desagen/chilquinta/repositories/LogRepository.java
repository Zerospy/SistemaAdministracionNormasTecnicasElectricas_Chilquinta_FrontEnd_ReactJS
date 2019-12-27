package cl.desagen.chilquinta.repositories;

import cl.desagen.chilquinta.entities.LogEntity;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface LogRepository extends PagingAndSortingRepository<LogEntity, Long> {

}
