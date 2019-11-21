package cl.desagen.chilquinta.repositories;

import cl.desagen.chilquinta.entities.NormaEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NormaRepository extends PagingAndSortingRepository<NormaEntity, Integer> {

    @Modifying
    @Query("UPDATE NormaEntity NE SET NE.downloadCounter = NE.downloadCounter + 1")
    void increaseCounterNormaEntity(Integer normaId);

    @Query("SELECT n FROM NormaEntity n WHERE n.estado.id = :idEstadoNorma")
    List<NormaEntity> findByStatus(@Param("idEstadoNorma") Long idEstadoNorma);

    @Query("SELECT Count(n) FROM NormaEntity n")
    Integer getNormasQuantity();

    @Query("SELECT Count(n) FROM NormaEntity n WHERE n.estado.id = :idEstadoNorma")
    Integer getNormasPublished(@Param("idEstadoNorma") Long idEstadoNorma);

    @Query("SELECT Count(n) FROM NormaEntity n WHERE n.id IN :idsNormasWithFiles")
    Integer getFileNormasQuantity(@Param("idsNormasWithFiles") List<Integer> idsNormasWithFiles);

    @Query("SELECT n FROM NormaEntity n WHERE n.id IN :idsNormasWithFiles")
    List<NormaEntity> getFileNormas(@Param("idsNormasWithFiles") List<Integer> idsNormasWithFiles);

    @Query("SELECT Count(n) FROM NormaEntity n WHERE n.downloadCounter > 0")
    Integer getCountNormasDownloaded();

    @Query("SELECT n FROM NormaEntity n WHERE n.downloadCounter > 0")
    List<NormaEntity> getNormasDownloaded();

    @Query("SELECT Count(n) FROM NormaEntity n WHERE n.id IN :idsNormasWithComments")
    Integer getNormasCommentsQuantity(@Param("idsNormasWithComments") List<Integer> idsNormasWithComments);

    @Query("SELECT n FROM NormaEntity n WHERE n.id IN :idsNormasWithComments")
    List<NormaEntity> getNormasWithComment(@Param("idsNormasWithComments") List<Integer> idsNormasWithComments);

    @Query("SELECT Count(n) FROM NormaEntity n WHERE n.estado.id <> :idEstadoNorma")
    Integer getCantidadNormasEnWorkflow(@Param("idEstadoNorma") Long idEstadoNorma);

    @Query("SELECT n FROM NormaEntity n WHERE n.estado.id <> :idEstadoNorma")
    List<NormaEntity> getNormasEnWorkflow(@Param("idEstadoNorma") Long idEstadoNorma);
}
