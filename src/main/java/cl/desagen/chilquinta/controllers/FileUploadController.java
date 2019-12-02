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
import java.nio.file.Files;
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

    @PostMapping("upload/{normaId}/{fileType}")
    public ResponseEntity handleFileUpload(@RequestParam("file") MultipartFile file, @PathVariable Integer normaId, @PathVariable FileExtension fileType) {

        try {
            storageService.store(file, normaId, fileType);
            return new ResponseEntity(HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.EXPECTATION_FAILED);
        }

    }

    @GetMapping("download/{normaId}/{fileType}")
    @ResponseBody
    public ResponseEntity<byte[]> getFile(@PathVariable Integer normaId, @PathVariable FileExtension fileType) {

        try {
            Resource resource = storageService.loadAsResource(normaId, fileType);

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CACHE_CONTROL, "no-cache, no-store, must-revalidate");
            headers.add(HttpHeaders.PRAGMA, "no-cache");
            headers.add(HttpHeaders.EXPIRES, "0");
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"");

            byte[] bytes = Files.readAllBytes(resource.getFile().toPath());

            if (fileType.pdf.equals(FileExtension.pdf)) {
                return ResponseEntity.ok().headers(headers)
                        .contentType(MediaType.APPLICATION_PDF)
                        .contentLength(resource.contentLength())
                        .body(bytes);
            } else {
                return ResponseEntity.ok().headers(headers)
                        .contentType(MediaType.APPLICATION_OCTET_STREAM)
                        .contentLength(resource.contentLength())
                        .body(bytes);
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