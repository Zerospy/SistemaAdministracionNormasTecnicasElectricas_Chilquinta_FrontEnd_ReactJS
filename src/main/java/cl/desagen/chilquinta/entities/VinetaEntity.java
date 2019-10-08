package cl.desagen.chilquinta.entities;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Objects;

@Entity
@Table(name = "vineta", schema = "dbo", catalog = "NORMAS")
public class VinetaEntity {
    private Long id;
    private String filename;
    private byte[] dwg;
    private String observacion;

    @Id
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "filename")
    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    @Basic
    @Column(name = "dwg")
    public byte[] getDwg() {
        return dwg;
    }

    public void setDwg(byte[] dwg) {
        this.dwg = dwg;
    }

    @Basic
    @Column(name = "observacion")
    public String getObservacion() {
        return observacion;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        VinetaEntity that = (VinetaEntity) o;
        return id == that.id &&
                Objects.equals(filename, that.filename) &&
                Arrays.equals(dwg, that.dwg) &&
                Objects.equals(observacion, that.observacion);
    }

    @Override
    public int hashCode() {

        int result = Objects.hash(id, filename, observacion);
        result = 31 * result + Arrays.hashCode(dwg);
        return result;
    }
}
