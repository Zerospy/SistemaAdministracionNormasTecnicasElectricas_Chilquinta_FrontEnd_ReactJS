package cl.desagen.chilquinta.entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "wf_aprobacion_usuario", schema = "dbo", catalog = "NORMAS")
public class WfAprobacionUsuarioEntity {
    private int id;
    private Integer wfAprobacionId;
    private Integer usuarioId;

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "wf_aprobacion_id")
    public Integer getWfAprobacionId() {
        return wfAprobacionId;
    }

    public void setWfAprobacionId(Integer wfAprobacionId) {
        this.wfAprobacionId = wfAprobacionId;
    }

    @Basic
    @Column(name = "usuario_id")
    public Integer getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Integer usuarioId) {
        this.usuarioId = usuarioId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WfAprobacionUsuarioEntity that = (WfAprobacionUsuarioEntity) o;
        return id == that.id &&
                Objects.equals(wfAprobacionId, that.wfAprobacionId) &&
                Objects.equals(usuarioId, that.usuarioId);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, wfAprobacionId, usuarioId);
    }
}
