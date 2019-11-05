package cl.desagen.chilquinta.entities;

import cl.desagen.chilquinta.enums.FileExtension;
import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "file_norma", schema = "dbo", catalog = "NORMAS")
public class FileNormaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    @Column(name = "url_file_location")
    private String urlFileLocation;

    @Column(name = "original_file_name")
    private String originalFileName;

    @Column(name = "file_extension")
    @Enumerated(value = EnumType.STRING)
    private FileExtension fileExtension;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "norma_id", nullable = false)
    private NormaEntity normaEntity;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "updated_at")
    private Timestamp updatedAt;

}
