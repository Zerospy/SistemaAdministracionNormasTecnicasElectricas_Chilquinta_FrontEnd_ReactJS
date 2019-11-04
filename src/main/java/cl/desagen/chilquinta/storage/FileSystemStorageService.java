package cl.desagen.chilquinta.storage;

import cl.desagen.chilquinta.entities.FileNormaEntity;
import cl.desagen.chilquinta.entities.NormaEntity;
import cl.desagen.chilquinta.enums.FileExtension;
import cl.desagen.chilquinta.services.FileNormaService;
import cl.desagen.chilquinta.services.NormaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;
import org.springframework.util.FileSystemUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class FileSystemStorageService implements StorageService {

    private Path rootLocation = null;

    @Value("${file.storage.pathLocation}")
    private String pathLocation;

    @Autowired
    private FileNormaService fileNormaService;

    @Autowired
    private NormaService normaService;

    @PostConstruct
    public void postConstruct() {
        this.rootLocation = Paths.get(pathLocation);
    }

    @Override
    public void store(MultipartFile file, Integer normaId) {

        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            String hashFileName = DigestUtils.md5DigestAsHex(filename.getBytes());
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file " + filename);
            }
            if (filename.contains("..")) {
                // This is a security check
                throw new StorageException(
                        "Cannot store file with relative path outside current directory "
                                + filename);
            }
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, this.rootLocation.resolve(hashFileName),
                        StandardCopyOption.REPLACE_EXISTING);

                FileNormaEntity fileNormaEntity = new FileNormaEntity();
                Timestamp now = new Timestamp(Instant.now().toEpochMilli());
                fileNormaEntity.setCreatedAt(now);
                fileNormaEntity.setFileExtension(FileExtension.pdf);

                Optional<NormaEntity> normaEntityOptional = normaService.findById(normaId);
                normaEntityOptional.ifPresent(fileNormaEntity::setNormaId);

                fileNormaEntity.setOriginalFileName(filename);
                fileNormaEntity.setUrlFileLocation(hashFileName);

                fileNormaService.save(fileNormaEntity);
            }
        } catch (IOException e) {
            throw new StorageException("Failed to store file " + filename, e);
        }
    }

    @Override
    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.rootLocation, 1)
                    .filter(path -> !path.equals(this.rootLocation))
                    .map(this.rootLocation::relativize);
        } catch (IOException e) {
            throw new StorageException("Failed to read stored files", e);
        }

    }

    @Override
    public Path load(String filename) {
        return rootLocation.resolve(filename);
    }

    @Override
    public Resource loadAsResource(String filename) {
        try {
            Path file = load(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new StorageFileNotFoundException(
                        "Could not read file: " + filename);

            }
        } catch (MalformedURLException e) {
            throw new StorageFileNotFoundException("Could not read file: " + filename, e);
        }
    }

    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    @Override
    public void init() {
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new StorageException("Could not initialize storage", e);
        }
    }
}
