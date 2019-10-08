package cl.desagen.chilquinta.entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "mod_seccion_norma", schema = "dbo", catalog = "NORMAS")
public class ModSeccionNormaEntity {
    private Long id;
    private Integer revisionId;
    private Integer notas;
    private Integer observaciones;
    private Integer normasRelacionadas;
    private Integer vineta;
    private Integer observacionRevision;
    private Integer estado;
    private Integer tablaMateriales;

    @Id
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "revision_id")
    public Integer getRevisionId() {
        return revisionId;
    }

    public void setRevisionId(Integer revisionId) {
        this.revisionId = revisionId;
    }

    @Basic
    @Column(name = "notas")
    public Integer getNotas() {
        return notas;
    }

    public void setNotas(Integer notas) {
        this.notas = notas;
    }

    @Basic
    @Column(name = "observaciones")
    public Integer getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(Integer observaciones) {
        this.observaciones = observaciones;
    }

    @Basic
    @Column(name = "normas_relacionadas")
    public Integer getNormasRelacionadas() {
        return normasRelacionadas;
    }

    public void setNormasRelacionadas(Integer normasRelacionadas) {
        this.normasRelacionadas = normasRelacionadas;
    }

    @Basic
    @Column(name = "vineta")
    public Integer getVineta() {
        return vineta;
    }

    public void setVineta(Integer vineta) {
        this.vineta = vineta;
    }

    @Basic
    @Column(name = "observacion_revision")
    public Integer getObservacionRevision() {
        return observacionRevision;
    }

    public void setObservacionRevision(Integer observacionRevision) {
        this.observacionRevision = observacionRevision;
    }

    @Basic
    @Column(name = "estado")
    public Integer getEstado() {
        return estado;
    }

    public void setEstado(Integer estado) {
        this.estado = estado;
    }

    @Basic
    @Column(name = "tabla_materiales")
    public Integer getTablaMateriales() {
        return tablaMateriales;
    }

    public void setTablaMateriales(Integer tablaMateriales) {
        this.tablaMateriales = tablaMateriales;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ModSeccionNormaEntity that = (ModSeccionNormaEntity) o;
        return id == that.id &&
                Objects.equals(revisionId, that.revisionId) &&
                Objects.equals(notas, that.notas) &&
                Objects.equals(observaciones, that.observaciones) &&
                Objects.equals(normasRelacionadas, that.normasRelacionadas) &&
                Objects.equals(vineta, that.vineta) &&
                Objects.equals(observacionRevision, that.observacionRevision) &&
                Objects.equals(estado, that.estado) &&
                Objects.equals(tablaMateriales, that.tablaMateriales);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, revisionId, notas, observaciones, normasRelacionadas, vineta, observacionRevision, estado, tablaMateriales);
    }
}
