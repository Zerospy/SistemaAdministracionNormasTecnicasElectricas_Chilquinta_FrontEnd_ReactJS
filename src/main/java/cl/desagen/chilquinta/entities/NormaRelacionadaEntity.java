package cl.desagen.chilquinta.entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "norma_relacionada", schema = "dbo", catalog = "NORMAS")
public class NormaRelacionadaEntity {
    private int id;
    private Integer revNormaId;
    private Integer normaRelId;
    private String observacion;

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
    @Column(name = "norma_rel_id")
    public Integer getNormaRelId() {
        return normaRelId;
    }

    public void setNormaRelId(Integer normaRelId) {
        this.normaRelId = normaRelId;
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
        NormaRelacionadaEntity that = (NormaRelacionadaEntity) o;
        return id == that.id &&
                Objects.equals(revNormaId, that.revNormaId) &&
                Objects.equals(normaRelId, that.normaRelId) &&
                Objects.equals(observacion, that.observacion);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, revNormaId, normaRelId, observacion);
    }
}
