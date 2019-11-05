package cl.desagen.chilquinta.security;

import cl.desagen.chilquinta.entities.UsuarioEntity;
import cl.desagen.chilquinta.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    private UsuarioService usuarioService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<UsuarioEntity> usuarioEntityOptional = usuarioService.findByUsuario(username);

        SessionUser sessionUser = new SessionUser();
        sessionUser.setUsername(username);

        usuarioEntityOptional.ifPresent(usuarioEntity -> sessionUser.setPassword(bcryptEncoder.encode(usuarioEntity.getClave())));

        if (username == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new org.springframework.security.core.userdetails.User(sessionUser.getUsername(), sessionUser.getPassword(),
                new ArrayList<>());
    }

}