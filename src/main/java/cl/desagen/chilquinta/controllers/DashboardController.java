package cl.desagen.chilquinta.controllers;

import cl.desagen.chilquinta.dto.DashboardDto;
import cl.desagen.chilquinta.entities.NormaEntity;
import cl.desagen.chilquinta.entities.ObservacionNormaEntity;
import cl.desagen.chilquinta.enums.EstadoNorma;
import cl.desagen.chilquinta.services.NormaService;
import cl.desagen.chilquinta.services.ObservacionNormaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;

@RestController
@RequestMapping("dashboard")
public class DashboardController {

    private static final Logger log = LoggerFactory.getLogger(DashboardController.class);

    @Autowired
    private NormaService normaService;

    @Autowired
    private ObservacionNormaService observacionNormaService;

    @GetMapping(value = "/info", produces = APPLICATION_JSON_UTF8_VALUE)
    public DashboardDto getDashboardInfo() {
        return normaService.getDashboardInformation();
    }

    @GetMapping(value = "/getLastComment", produces = APPLICATION_JSON_UTF8_VALUE)
    public Iterable<ObservacionNormaEntity> getLastComment() {
        return observacionNormaService.getLastComment();
    }

    @GetMapping(value = "/getAllPublished", produces = APPLICATION_JSON_UTF8_VALUE)
    public Iterable<NormaEntity> getAllPublished() {
        return normaService.findByStatus(EstadoNorma.PUBLICADA);
    }

    @GetMapping(value = "/getAllWithFiles", produces = APPLICATION_JSON_UTF8_VALUE)
    public Iterable<NormaEntity> getAllWithFiles() {
        return normaService.getAllWithFiles();
    }

    @GetMapping(value = "/getDownloaded", produces = APPLICATION_JSON_UTF8_VALUE)
    public Iterable<NormaEntity> getNormasDownloaded() {
        return normaService.getNormasDownloaded();
    }

    @GetMapping(value = "/getWithComment", produces = APPLICATION_JSON_UTF8_VALUE)
    public Iterable<NormaEntity> getNormasWithComment() {
        return normaService.getNormasWithComment();
    }

    @GetMapping(value = "/getEnWorkflow", produces = APPLICATION_JSON_UTF8_VALUE)
    public Iterable<NormaEntity> getNormasEnWorkflow() {
        return normaService.getNormasEnWorkflow();
    }

}
