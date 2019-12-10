package cl.desagen.chilquinta.commons;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Base64;

public class FileUtil {

    public static String encodeFileToBase64(File file) {
        try {
            byte[] fileContent = Files.readAllBytes(file.toPath());
            return Base64.getEncoder().encodeToString(fileContent);
        } catch (IOException e) {
            throw new IllegalStateException("could not read file " + file, e);
        }
    }

}
