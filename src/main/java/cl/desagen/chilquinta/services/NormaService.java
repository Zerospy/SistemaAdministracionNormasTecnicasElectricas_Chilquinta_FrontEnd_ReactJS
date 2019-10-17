package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.EstadosEntity;
import cl.desagen.chilquinta.entities.NormaEntity;
import cl.desagen.chilquinta.entities.UsuarioEntity;
import cl.desagen.chilquinta.enums.EstadoNorma;
import cl.desagen.chilquinta.repositories.EstadosRepository;
import cl.desagen.chilquinta.repositories.NormaRepository;
import cl.desagen.chilquinta.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NormaService {

    @Autowired
    private NormaRepository normaRepository;

    @Autowired
    private EstadosRepository estadosRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Value("${spring.mail.to}")
    private String[] mailTo;

    @Value("${spring.mail.publish.subject}")
    private String mailPublishSubject;

    @Value("${spring.mail.publish.body}")
    private String mailPublishBody;

    public Iterable<NormaEntity> findAll() {
        return normaRepository.findAll();
    }

    public Iterable<NormaEntity> findAll(Pageable pageable) {
        return normaRepository.findAll(pageable);
    }

    public NormaEntity save(NormaEntity normaEntity) {
        return normaRepository.save(normaEntity);
    }

    public Iterable<NormaEntity> saveAll(Iterable<NormaEntity> normaEntities) {
        return normaRepository.saveAll(normaEntities);
    }


    public Optional<NormaEntity> findById(Long id) {
        return normaRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return normaRepository.existsById(id);
    }

    public Iterable<NormaEntity> findAllById(Iterable<Long> ids) {
        return normaRepository.findAllById(ids);
    }

    public long count() {
        return normaRepository.count();
    }

    public void deleteById(Long id) {
        normaRepository.deleteById(id);
    }

    public void delete(NormaEntity normaEntity) {
        normaRepository.delete(normaEntity);
    }

    public void deleteAll(Iterable<NormaEntity> normaEntities) {
        normaRepository.deleteAll(normaEntities);
    }

    public void deleteAll() {
        normaRepository.deleteAll();
    }

    public Iterable<NormaEntity> findAll(Sort sort) {
        return normaRepository.findAll(sort);
    }

    public void publishNorma(Long id) {

        Optional<NormaEntity> normaEntityOptional = normaRepository.findById(id);

        if (normaEntityOptional.isPresent()) {
            Optional<EstadosEntity> normaEstado = estadosRepository.findById(Long.valueOf(EstadoNorma.PUBLICADA.value));

            NormaEntity normaEntity = normaEntityOptional.get();
            normaEntity.setEstado(normaEstado.orElse(null));

            Optional<UsuarioEntity> usuarioEntityOptional = usuarioRepository.findById(1L);

            UsuarioEntity usuarioEntity = usuarioEntityOptional.isPresent() ? usuarioEntityOptional.get() : null;

            emailService.sendEmail(mailTo, mailPublishSubject, String.format(mailPublishBody, normaEntity.getCodNorma(), usuarioEntity));

            normaRepository.save(normaEntity);
        }

    }
}
