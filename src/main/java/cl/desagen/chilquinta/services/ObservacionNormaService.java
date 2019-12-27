package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.dto.CommentRequestDto;
import cl.desagen.chilquinta.entities.EstadosEntity;
import cl.desagen.chilquinta.entities.NormaEntity;
import cl.desagen.chilquinta.entities.ObservacionNormaEntity;
import cl.desagen.chilquinta.entities.UsuarioEntity;
import cl.desagen.chilquinta.enums.EstadoNorma;
import cl.desagen.chilquinta.exceptions.BusinessException;
import cl.desagen.chilquinta.repositories.EstadosRepository;
import cl.desagen.chilquinta.repositories.NormaRepository;
import cl.desagen.chilquinta.repositories.ObservacionNormaRepository;
import cl.desagen.chilquinta.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
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
    private EmailService emailService;

    @Value("${spring.mail.to}")
    private String[] mailTo;

    @Value("${spring.mail.comment.subject}")
    private String mailCommentSubject;

    @Value("${spring.mail.comment.body}")
    private String mailCommentBody;

    @Value("${spring.last-comments}")
    private Integer lastCommentsQty;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Iterable<ObservacionNormaEntity> findAll() {
        return observacionnormaRepository.findAll();
    }

    public Iterable<ObservacionNormaEntity> findAll(Pageable pageable) {
        return observacionnormaRepository.findAll(pageable);
    }

    public Iterable<ObservacionNormaEntity> findAllByNormaId(Integer normaId) {
        return observacionnormaRepository.findAllByNormaEntityId(normaId);
    }


    public ObservacionNormaEntity save(ObservacionNormaEntity observacionnormaEntity) {
        return observacionnormaRepository.save(observacionnormaEntity);
    }

    public Iterable<ObservacionNormaEntity> saveAll(Iterable<ObservacionNormaEntity> observacionnormaEntities) {
        return observacionnormaRepository.saveAll(observacionnormaEntities);
    }


    public Optional<ObservacionNormaEntity> findById(Integer id) {
        return observacionnormaRepository.findById(id);
    }

    public boolean existsById(Integer id) {
        return observacionnormaRepository.existsById(id);
    }

    public Iterable<ObservacionNormaEntity> findAllById(Iterable<Integer> ids) {
        return observacionnormaRepository.findAllById(ids);
    }

    public long count() {
        return observacionnormaRepository.count();
    }

    public void deleteById(Integer id) {
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

    public ObservacionNormaEntity saveComment(Integer id, CommentRequestDto comment, String username) throws BusinessException {

        ObservacionNormaEntity observacionNormaEntity = new ObservacionNormaEntity();

        Optional<NormaEntity> normaEntityOptional = normaRepository.findById(id);

        NormaEntity normaEntity = normaEntityOptional.isPresent() ? normaEntityOptional.get() : null;

        if (normaEntity == null) {
            throw new BusinessException("Norma entity not found");
        }

        Optional<EstadosEntity> normaEstado = estadosRepository.findById(Long.valueOf(EstadoNorma.CON_COMENTARIOS.value));
        normaEntity.setEstado(normaEstado.orElse(null));
        normaRepository.save(normaEntity);

        observacionNormaEntity.setNormaEntity(normaEntity);

        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());

        Optional<UsuarioEntity> usuarioEntityOptional = usuarioRepository.findByUsuario(username);
        UsuarioEntity usuarioEntity = usuarioEntityOptional.orElse(null);

        if (usuarioEntity == null) {
            throw new BusinessException("User not found");
        }

        observacionNormaEntity.setObservacion(comment.getComment());
        observacionNormaEntity.setUsuarioEntity(usuarioEntity);
        observacionNormaEntity.setCreatedAt(timestamp);

        observacionnormaRepository.save(observacionNormaEntity);

        emailService.sendEmail(mailTo, String.format(mailCommentSubject, normaEntity.getCodNorma()), String.format(mailCommentBody, normaEntity.getCodNorma(), usuarioEntity.getFullName()));

        return observacionNormaEntity;
    }

    public Iterable<ObservacionNormaEntity> getLastComment() {
        Pageable pageable = PageRequest.of(0, lastCommentsQty);
        return observacionnormaRepository.findAllByNormaEntityId(pageable);
    }
}
