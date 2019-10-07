package cl.desagen.chilquinta.entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "revision_norma", schema = "dbo", catalog = "NORMAS")
public class RevisionNormaEntity {
    private int id;
    private Integer normaId;
    private String revision;
    private Integer estado;

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "norma_id")
    public Integer getNormaId() {
        return normaId;
    }

    public void setNormaId(Integer normaId) {
        this.normaId = normaId;
    }

    @Basic
    @Column(name = "revision")
    public String getRevision() {
        return revision;
    }

    public void setRevision(String revision) {
        this.revision = revision;
    }

    @Basic
    @Column(name = "estado")
    public Integer getEstado() {
        return estado;
    }

    public void setEstado(Integer estado) {
        this.estado = estado;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RevisionNormaEntity that = (RevisionNormaEntity) o;
        return id == that.id &&
                Objects.equals(normaId, that.normaId) &&
                Objects.equals(revision, that.revision) &&
                Objects.equals(estado, that.estado);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, normaId, revision, estado);
    }
}
