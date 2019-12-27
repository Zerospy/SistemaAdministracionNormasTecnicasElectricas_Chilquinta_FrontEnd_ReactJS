package cl.desagen.chilquinta.storage;

import cl.desagen.chilquinta.enums.FileExtension;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.stream.Stream;

//https://spring.io/guides/gs/uploading-files/
public interface StorageService {

    void init();

    void store(MultipartFile file, Integer normaId, FileExtension fileType);

    Stream<Path> loadAll();

    Resource loadAsResource(Integer normaId, FileExtension fileExtension);

    void deleteAll();

}
