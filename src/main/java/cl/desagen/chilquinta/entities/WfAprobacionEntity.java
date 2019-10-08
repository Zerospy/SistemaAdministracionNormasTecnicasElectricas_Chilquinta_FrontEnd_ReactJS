package cl.desagen.chilquinta.entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "wf_aprobacion", schema = "dbo", catalog = "NORMAS")
public class WfAprobacionEntity {
    private Long id;
    private Integer revNormaId;
    private Integer paso;
    private Integer estado;
    private String descripcionPaso;
    private Integer postId;

    @Id
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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
    @Column(name = "paso")
    public Integer getPaso() {
        return paso;
    }

    public void setPaso(Integer paso) {
        this.paso = paso;
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
    @Column(name = "descripcion_paso")
    public String getDescripcionPaso() {
        return descripcionPaso;
    }

    public void setDescripcionPaso(String descripcionPaso) {
        this.descripcionPaso = descripcionPaso;
    }

    @Basic
    @Column(name = "post_id")
    public Integer getPostId() {
        return postId;
    }

    public void setPostId(Integer postId) {
        this.postId = postId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WfAprobacionEntity that = (WfAprobacionEntity) o;
        return id == that.id &&
                Objects.equals(revNormaId, that.revNormaId) &&
                Objects.equals(paso, that.paso) &&
                Objects.equals(estado, that.estado) &&
                Objects.equals(descripcionPaso, that.descripcionPaso) &&
                Objects.equals(postId, that.postId);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, revNormaId, paso, estado, descripcionPaso, postId);
    }
}
