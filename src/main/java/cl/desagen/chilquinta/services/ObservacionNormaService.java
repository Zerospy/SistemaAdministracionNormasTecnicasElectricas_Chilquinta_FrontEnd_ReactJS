package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.EstadosEntity;
import cl.desagen.chilquinta.entities.NormaEntity;
import cl.desagen.chilquinta.entities.ObservacionNormaEntity;
import cl.desagen.chilquinta.entities.UsuarioEntity;
import cl.desagen.chilquinta.enums.EstadoNorma;
import cl.desagen.chilquinta.repositories.EstadosRepository;
import cl.desagen.chilquinta.repositories.NormaRepository;
import cl.desagen.chilquinta.repositories.ObservacionNormaRepository;
import cl.desagen.chilquinta.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Optional;

@Service
public class ObservacionNormaService {

    @Autowired
    private NormaRepository normaRepository;

    @Autowired
    private EstadosRepository estadosRepository;

    @Autowired
    private ObservacionNormaRepository observacionnormaRepository;


    @Autowired
    private UsuarioRepository usuarioRepository;

    public Iterable<ObservacionNormaEntity> findAll() {
        return observacionnormaRepository.findAll();
    }

    public Iterable<ObservacionNormaEntity> findAll(Pageable pageable) {
        return observacionnormaRepository.findAll(pageable);
    }

    public Iterable<ObservacionNormaEntity> findAllByNormaId(Long normaId) {
        return observacionnormaRepository.findAllByNormaId(normaId);
    }


    public ObservacionNormaEntity save(ObservacionNormaEntity observacionnormaEntity) {
        return observacionnormaRepository.save(observacionnormaEntity);
    }

    public Iterable<ObservacionNormaEntity> saveAll(Iterable<ObservacionNormaEntity> observacionnormaEntities) {
        return observacionnormaRepository.saveAll(observacionnormaEntities);
    }


    public Optional<ObservacionNormaEntity> findById(Long id) {
        return observacionnormaRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return observacionnormaRepository.existsById(id);
    }

    public Iterable<ObservacionNormaEntity> findAllById(Iterable<Long> ids) {
        return observacionnormaRepository.findAllById(ids);
    }

    public long count() {
        return observacionnormaRepository.count();
    }

    public void deleteById(Long id) {
        observacionnormaRepository.deleteById(id);
    }

    public void delete(ObservacionNormaEntity observacionnormaEntity) {
        observacionnormaRepository.delete(observacionnormaEntity);
    }

    public void deleteAll(Iterable<ObservacionNormaEntity> observacionnormaEntities) {
        observacionnormaRepository.deleteAll(observacionnormaEntities);
    }

    public void deleteAll() {
        observacionnormaRepository.deleteAll();
    }

    public Iterable<ObservacionNormaEntity> findAll(Sort sort) {
        return observacionnormaRepository.findAll(sort);
    }

    public ObservacionNormaEntity saveComment(Long id, String comment) {

        ObservacionNormaEntity observacionNormaEntity = new ObservacionNormaEntity();

        Optional<NormaEntity> normaEntityOptional = normaRepository.findById(id);

        if (normaEntityOptional.isPresent()) {
            NormaEntity normaEntity = normaEntityOptional.get();
            Optional<EstadosEntity> normaEstado = estadosRepository.findById(Long.valueOf(EstadoNorma.CON_COMENTARIOS.value));
            normaEntity.setEstado(normaEstado.isPresent() ? normaEstado.get() : null);
            normaRepository.save(normaEntity);

            observacionNormaEntity.setNormaId(normaEntity.getId());
        }

        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());

        Optional<UsuarioEntity> usuarioEntity = usuarioRepository.findById(1L);

        observacionNormaEntity.setObservacion(comment);
        observacionNormaEntity.setUsuarioEntity(usuarioEntity.isPresent() ? usuarioEntity.get() : null);
        observacionNormaEntity.setCreatedAt(timestamp);

        return observacionNormaEntity;
    }
}
