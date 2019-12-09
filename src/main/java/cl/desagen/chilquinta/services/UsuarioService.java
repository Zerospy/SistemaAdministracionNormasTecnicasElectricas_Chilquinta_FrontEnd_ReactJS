package cl.desagen.chilquinta.services;

import cl.desagen.chilquinta.entities.UsuarioEntity;
import cl.desagen.chilquinta.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.xml.bind.DatatypeConverter;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Iterable<UsuarioEntity> findAll() {
        return usuarioRepository.findAll();
    }

    public Iterable<UsuarioEntity> findAll(Pageable pageable) {
        return usuarioRepository.findAll(pageable);
    }

    public UsuarioEntity save(UsuarioEntity usuarioEntity) throws NoSuchAlgorithmException {

        Optional<UsuarioEntity> usuarioEntityToSaveOptional = usuarioRepository.findById(usuarioEntity.getId());

        UsuarioEntity usuarioEntityToSave;

        if (usuarioEntityToSaveOptional.isPresent()) {
            usuarioEntityToSave = usuarioEntityToSaveOptional.get();

            usuarioEntityToSave.setNombres(usuarioEntity.getNombres());
            usuarioEntityToSave.setApellidos(usuarioEntity.getApellidos());
            usuarioEntityToSave.setUsuario(usuarioEntity.getUsuario());
            usuarioEntityToSave.setEmail(usuarioEntity.getEmail());

            if (usuarioEntity.getClave() != null && !usuarioEntity.getClave().isEmpty()) {

                MessageDigest md = MessageDigest.getInstance("MD5");
                md.update(usuarioEntity.getClave().getBytes());
                byte[] digest = md.digest();
                String passwordMD5 = DatatypeConverter
                        .printHexBinary(digest).toUpperCase();

                usuarioEntityToSave.setClave(passwordMD5);
                usuarioEntityToSave.setClaveTextoPlano(usuarioEntity.getClave());
            }

            usuarioEntityToSave.setEstado(usuarioEntity.getEstado());
            usuarioEntityToSave.setAdministrador(usuarioEntity.getAdministrador());

            return usuarioRepository.save(usuarioEntityToSave);
        }

        return null;

    }

    public Iterable<UsuarioEntity> saveAll(Iterable<UsuarioEntity> usuarioEntities) {
        return usuarioRepository.saveAll(usuarioEntities);
    }

    public Optional<UsuarioEntity> findById(Integer id) {
        return usuarioRepository.findById(id);
    }

    public Optional<UsuarioEntity> findByUsuarioAndClave(String username, String clave) {
        return usuarioRepository.findByUsuarioAndClave(username, clave);
    }


    public Optional<UsuarioEntity> findByUsuario(String username) {
        return usuarioRepository.findByUsuario(username);
    }

    public boolean existsById(Integer id) {
        return usuarioRepository.existsById(id);
    }

    public Iterable<UsuarioEntity> findAllById(Iterable<Integer> ids) {
        return usuarioRepository.findAllById(ids);
    }

    public long count() {
        return usuarioRepository.count();
    }

    public void deleteById(Integer id) {
        usuarioRepository.deleteById(id);
    }

    public void delete(UsuarioEntity usuarioEntity) {
        usuarioRepository.delete(usuarioEntity);
    }

    public void deleteAll(Iterable<UsuarioEntity> usuarioEntities) {
        usuarioRepository.deleteAll(usuarioEntities);
    }

    public void deleteAll() {
        usuarioRepository.deleteAll();
    }

    public Iterable<UsuarioEntity> findAll(Sort sort) {
        return usuarioRepository.findAll(sort);
    }

}
