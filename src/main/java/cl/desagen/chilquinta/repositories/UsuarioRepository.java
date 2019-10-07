package cl.desagen.chilquinta.repositories;

import cl.desagen.chilquinta.entities.UsuarioEntity;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UsuarioRepository extends PagingAndSortingRepository<UsuarioEntity, Long> {

}
