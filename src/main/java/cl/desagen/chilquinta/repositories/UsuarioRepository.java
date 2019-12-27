package cl.desagen.chilquinta.repositories;

import cl.desagen.chilquinta.entities.UsuarioEntity;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface UsuarioRepository extends PagingAndSortingRepository<UsuarioEntity, Integer> {

    Optional<UsuarioEntity> findByUsuarioAndClave(String username, String clave);

    Optional<UsuarioEntity> findByUsuario(String username);
}
