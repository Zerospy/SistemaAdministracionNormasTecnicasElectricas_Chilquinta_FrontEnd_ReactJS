package cl.desagen.chilquinta.controllers;

import cl.desagen.chilquinta.entities.UsuarioEntity;
import cl.desagen.chilquinta.security.JwtRequest;
import cl.desagen.chilquinta.security.JwtResponse;
import cl.desagen.chilquinta.security.JwtTokenUtil;
import cl.desagen.chilquinta.security.JwtUserDetailsService;
import cl.desagen.chilquinta.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.xml.bind.DatatypeConverter;
import java.security.MessageDigest;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("login")
public class JwtAuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    private UsuarioService usuarioService;

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());
        final String token = jwtTokenUtil.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token));
    }

    private void authenticate(String username, String password) throws Exception {
        try {

            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(password.getBytes());
            byte[] digest = md.digest();
            String passwordMD5 = DatatypeConverter
                    .printHexBinary(digest).toUpperCase();

            Optional<UsuarioEntity> usuarioEntityOptional = usuarioService.findByUsuarioAndClave(username, passwordMD5);

            if (!usuarioEntityOptional.isPresent()) {
                throw new BadCredentialsException("INVALID_USER_PASS");
            }

            UsuarioEntity usuarioEntity = usuarioEntityOptional.get();

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, usuarioEntity.getClave()));

        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}