package cl.desagen.chilquinta.controllers;

import cl.desagen.chilquinta.commons.Constants;
import cl.desagen.chilquinta.dto.CommentRequestDto;
import cl.desagen.chilquinta.entities.ObservacionNormaEntity;
import cl.desagen.chilquinta.security.JwtTokenUtil;
import cl.desagen.chilquinta.services.ObservacionNormaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;

@RestController
@RequestMapping("observacionnorma")
public class ObservacionNormaController {

    private static final Logger log = LoggerFactory.getLogger(ObservacionNormaController.class);

    @Autowired
    private ObservacionNormaService observacionnormaService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @GetMapping(value = "/", produces = APPLICATION_JSON_UTF8_VALUE)
    public Iterable<ObservacionNormaEntity> findAll() {
        return observacionnormaService.findAll();
    }

    @GetMapping(value = "/{id}", produces = APPLICATION_JSON_UTF8_VALUE)
    public Optional<ObservacionNormaEntity> findById(@PathVariable Long id) {
        return observacionnormaService.findById(id);
    }

    @GetMapping(value = "getByIdNorma/{id}", produces = APPLICATION_JSON_UTF8_VALUE)
    public Iterable<ObservacionNormaEntity> findAllByNormaId(@PathVariable Integer id) {
        return observacionnormaService.findAllByNormaId(id);
    }

    @PostMapping(value = "/{id}", consumes = APPLICATION_JSON_UTF8_VALUE, produces = APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity save(HttpServletRequest httpServletRequest, @PathVariable Integer id, @RequestBody CommentRequestDto comment) {

        try {
            String tokenFromRequest = jwtTokenUtil.getTokenFromRequest(httpServletRequest);

            ObservacionNormaEntity observacionnormaResult = observacionnormaService.saveComment(id, comment);
            return new ResponseEntity(observacionnormaResult, HttpStatus.OK);
        } catch (Exception e) {
            if (log.isErrorEnabled()) {
                log.error(Constants.BAD_REQUEST_MESSAGE, e.getMessage(), e);
            }
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

    }

    @DeleteMapping(value = "/", consumes = APPLICATION_JSON_UTF8_VALUE, produces = APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity delete(@RequestBody ObservacionNormaEntity observacionnormaEntity) {

        try {
            observacionnormaService.delete(observacionnormaEntity);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            if (log.isErrorEnabled()) {
                log.error(Constants.BAD_REQUEST_MESSAGE, e.getMessage(), e);
            }
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

    }

    @DeleteMapping(value = "/{id}", consumes = APPLICATION_JSON_UTF8_VALUE, produces = APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity delete(@PathVariable Long id) {

        try {
            observacionnormaService.deleteById(id);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            if (log.isErrorEnabled()) {
                log.error(Constants.BAD_REQUEST_MESSAGE, e.getMessage(), e);
            }
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

    }

}
