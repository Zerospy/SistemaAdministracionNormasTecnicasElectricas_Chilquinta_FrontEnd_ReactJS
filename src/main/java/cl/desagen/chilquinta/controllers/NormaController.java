package cl.desagen.chilquinta.controllers;

import cl.desagen.chilquinta.entities.NormaEntity;
import cl.desagen.chilquinta.services.NormaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("normas")
public class NormaController {

    @Autowired
    private NormaService normaService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public Iterable<NormaEntity> findAll() {
        return normaService.findAll();
    }

}
