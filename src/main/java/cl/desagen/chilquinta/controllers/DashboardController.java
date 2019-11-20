package cl.desagen.chilquinta.controllers;

import cl.desagen.chilquinta.dto.DashboardDto;
import cl.desagen.chilquinta.services.NormaService;
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

    @GetMapping(value = "/info", produces = APPLICATION_JSON_UTF8_VALUE)
    public DashboardDto getDashboardInfo() {
        return normaService.getDashboardInformation();
    }

}
