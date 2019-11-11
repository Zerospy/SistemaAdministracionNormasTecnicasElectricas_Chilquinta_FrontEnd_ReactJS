package cl.desagen.chilquinta.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "norma", schema = "dbo", catalog = "NORMAS")
@Data
public class NormaEntity {

    @Id
    @JsonProperty
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Integer id;

    @JsonProperty
    @Column(name = "cod_norma")
    private String codNorma;

    @JsonProperty
    @Column(name = "nombre")
    private String nombre;

    @JsonProperty
    @Column(name = "descripcion")
    private String descripcion;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonProperty
    @JoinColumn(name = "estado_id")
    private EstadosEntity estado;

    @JsonProperty
    @Column(name = "fecha")
    private Timestamp fecha;

    @JsonProperty
    @Column(name = "tipo_tabla")
    private Integer tipoTabla;

    @JsonProperty
    @Column(name = "Url_pdf")
    private String urlPdf;

    @JsonProperty
    @Column(name = "Url_cad")
    private String urlCad;

    @JsonProperty
    @Column(name = "download_counter")
    private Integer downloadCounter;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        NormaEntity that = (NormaEntity) o;
        return id == that.id &&
                Objects.equals(codNorma, that.codNorma) &&
                Objects.equals(nombre, that.nombre) &&
                Objects.equals(descripcion, that.descripcion) &&
                Objects.equals(estado, that.estado) &&
                Objects.equals(fecha, that.fecha) &&
                Objects.equals(tipoTabla, that.tipoTabla) &&
                Objects.equals(urlPdf, that.urlPdf) &&
                Objects.equals(urlCad, that.urlCad) &&
                Objects.equals(downloadCounter, that.downloadCounter);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, codNorma, nombre, descripcion, estado, fecha, tipoTabla, urlPdf, urlCad);
    }
}
