package cl.desagen.chilquinta.entities;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "norma_id", nullable = false)
    private NormaEntity normaId;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "updated_at")
    private Timestamp updatedAt;

}
