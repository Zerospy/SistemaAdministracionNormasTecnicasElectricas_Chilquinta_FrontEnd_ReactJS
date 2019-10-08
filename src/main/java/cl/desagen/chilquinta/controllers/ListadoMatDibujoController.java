package cl.desagen.chilquinta.controllers;

import cl.desagen.chilquinta.commons.Constants;
import cl.desagen.chilquinta.entities.ListadoMatDibujoEntity;
import cl.desagen.chilquinta.services.ListadoMatDibujoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;

@RestController
@RequestMapping("listadomatdibujo")
public class ListadoMatDibujoController {

    private static final Logger log = LoggerFactory.getLogger(ListadoMatDibujoController.class);

    @Autowired
    private ListadoMatDibujoService listadomatdibujoService;

    @GetMapping(value = "/", produces = APPLICATION_JSON_UTF8_VALUE)
    public Iterable<ListadoMatDibujoEntity> findAll() {
        return listadomatdibujoService.findAll();
    }

    @GetMapping(value = "/{id}", produces = APPLICATION_JSON_UTF8_VALUE)
    public Optional<ListadoMatDibujoEntity> findById(@PathVariable Long id) {
        return listadomatdibujoService.findById(id);
    }

    @PostMapping(value = "/", consumes = APPLICATION_JSON_UTF8_VALUE, produces = APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity save(@RequestBody ListadoMatDibujoEntity listadomatdibujoEntity) {

        try {
            ListadoMatDibujoEntity listadomatdibujoResult = listadomatdibujoService.save(listadomatdibujoEntity);
            return new ResponseEntity(listadomatdibujoResult, HttpStatus.OK);
        } catch (Exception e) {
            if (log.isErrorEnabled()) {
                log.error(Constants.BAD_REQUEST_MESSAGE, e.getMessage(), e);
            }
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

    }

    @DeleteMapping(value = "/", consumes = APPLICATION_JSON_UTF8_VALUE, produces = APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity delete(@RequestBody ListadoMatDibujoEntity listadomatdibujoEntity) {

        try {
            listadomatdibujoService.delete(listadomatdibujoEntity);
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
            listadomatdibujoService.deleteById(id);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            if (log.isErrorEnabled()) {
                log.error(Constants.BAD_REQUEST_MESSAGE, e.getMessage(), e);
            }
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

    }

}
