package cl.desagen.chilquinta.controllers;

import cl.desagen.chilquinta.enums.FileExtension;
import cl.desagen.chilquinta.storage.StorageFileNotFoundException;
import cl.desagen.chilquinta.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("norma-files")
public class FileUploadController {

    private final StorageService storageService;

    @Autowired
    public FileUploadController(StorageService storageService) {
        this.storageService = storageService;
    }

    @GetMapping("/")
    public List<String> listUploadedFiles(Model model) throws IOException {
        return storageService.loadAll().map(
                path -> MvcUriComponentsBuilder.fromMethodName(FileUploadController.class,
                        "serveFile", path.getFileName().toString()).build().toString())
                .collect(Collectors.toList());
    }

    @PostMapping("/{normaId}/{fileType}")
    public ResponseEntity handleFileUpload(@RequestParam("file") MultipartFile file, @PathVariable Integer normaId, @PathVariable FileExtension fileType) {

        try {
            storageService.store(file, normaId, fileType);
            return new ResponseEntity(HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.EXPECTATION_FAILED);
        }

    }

    @GetMapping("/{normaId}/{fileType}")
    @ResponseBody
    public ResponseEntity<Resource> getFile(@PathVariable Integer normaId, @PathVariable FileExtension fileType) {

        try {
            Resource resource = storageService.loadAsResource(normaId, fileType);

            if(fileType.pdf.equals(FileExtension.pdf)) {
                return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + resource.getFilename() + "\"")
                        .contentType(MediaType.APPLICATION_PDF)
                        .contentLength(resource.contentLength())
                                .body(resource);
            } else {
                return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + resource.getFilename() + "\"")
                        .contentLength(resource.contentLength())
                        .body(resource);
            }

        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.EXPECTATION_FAILED);
        }

    }

    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
    }

}