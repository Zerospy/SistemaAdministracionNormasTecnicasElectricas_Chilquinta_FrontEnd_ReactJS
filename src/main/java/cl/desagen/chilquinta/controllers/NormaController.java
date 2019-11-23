package cl.desagen.chilquinta.controllers;

import cl.desagen.chilquinta.commons.Constants;
import cl.desagen.chilquinta.entities.NormaEntity;
import cl.desagen.chilquinta.enums.EstadoNorma;
import cl.desagen.chilquinta.security.JwtTokenUtil;
import cl.desagen.chilquinta.services.NormaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;

@RestController
@RequestMapping("norma")
public class NormaController {

    private static final Logger log = LoggerFactory.getLogger(NormaController.class);

    @Autowired
    private NormaService normaService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @GetMapping(value = "/", produces = APPLICATION_JSON_UTF8_VALUE)
    public Iterable<NormaEntity> findAll() {
        return normaService.findAll();
    }

    @GetMapping(value = "/{id}", produces = APPLICATION_JSON_UTF8_VALUE)
    public Optional<NormaEntity> findById(@PathVariable Integer id) {
        return normaService.findById(id);
    }

    @GetMapping(value = "findByStatus/{estadoNorma}", produces = APPLICATION_JSON_UTF8_VALUE)
    public List<NormaEntity> findByStatus(@PathVariable EstadoNorma estadoNorma) {
        return normaService.findByStatus(estadoNorma);
    }

    @PostMapping(value = "/", consumes = APPLICATION_JSON_UTF8_VALUE, produces = APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity save(@RequestBody NormaEntity normaEntity) {

        try {
            NormaEntity normaEntityResult = normaService.save(normaEntity);
            return new ResponseEntity(normaEntityResult, HttpStatus.OK);
        } catch (Exception e) {
            if (log.isErrorEnabled()) {
                log.error(Constants.BAD_REQUEST_MESSAGE, e.getMessage(), e);
            }
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

    }

    @DeleteMapping(value = "/", consumes = APPLICATION_JSON_UTF8_VALUE, produces = APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity delete(@RequestBody NormaEntity normaEntity) {

        try {
            normaService.delete(normaEntity);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            if (log.isErrorEnabled()) {
                log.error(Constants.BAD_REQUEST_MESSAGE, e.getMessage(), e);
            }
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

    }

    @DeleteMapping(value = "/{id}", consumes = APPLICATION_JSON_UTF8_VALUE, produces = APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity delete(@PathVariable Integer id) {

        try {
            normaService.deleteById(id);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            if (log.isErrorEnabled()) {
                log.error(Constants.BAD_REQUEST_MESSAGE, e.getMessage(), e);
            }
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping(value = "/publish/{id}", produces = APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity publishNorma(HttpServletRequest httpServletRequest, @PathVariable Integer id) {

        try {
            String username = jwtTokenUtil.getUsernameFromRequest(httpServletRequest);

            normaService.publishNorma(id, username);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            if (log.isErrorEnabled()) {
                log.error(Constants.BAD_REQUEST_MESSAGE, e.getMessage(), e);
            }
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

    }

}
