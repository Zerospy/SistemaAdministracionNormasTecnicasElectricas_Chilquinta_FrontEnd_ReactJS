package cl.desagen.chilquinta.entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "listado_mat_norma", schema = "dbo", catalog = "NORMAS")
public class ListadoMatNormaEntity {
    private int id;
    private Integer revNormaId;
    private Integer normaAsocId;
    private String descripcion;

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "rev_norma_id")
    public Integer getRevNormaId() {
        return revNormaId;
    }

    public void setRevNormaId(Integer revNormaId) {
        this.revNormaId = revNormaId;
    }

    @Basic
    @Column(name = "norma_asoc_id")
    public Integer getNormaAsocId() {
        return normaAsocId;
    }

    public void setNormaAsocId(Integer normaAsocId) {
        this.normaAsocId = normaAsocId;
    }

    @Basic
    @Column(name = "descripcion")
    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ListadoMatNormaEntity that = (ListadoMatNormaEntity) o;
        return id == that.id &&
                Objects.equals(revNormaId, that.revNormaId) &&
                Objects.equals(normaAsocId, that.normaAsocId) &&
                Objects.equals(descripcion, that.descripcion);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, revNormaId, normaAsocId, descripcion);
    }
}
