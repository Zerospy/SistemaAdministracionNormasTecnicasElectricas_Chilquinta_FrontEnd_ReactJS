package cl.desagen.chilquinta.entities;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "log", schema = "dbo", catalog = "NORMAS")
public class LogEntity {
    private int id;
    private Integer usuarioId;
    private Integer accionSistemaId;
    private Integer revisionId;
    private Integer objetoId;
    private String detalle;
    private Timestamp timestamp;

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "usuario_id")
    public Integer getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Integer usuarioId) {
        this.usuarioId = usuarioId;
    }

    @Basic
    @Column(name = "accion_sistema_id")
    public Integer getAccionSistemaId() {
        return accionSistemaId;
    }

    public void setAccionSistemaId(Integer accionSistemaId) {
        this.accionSistemaId = accionSistemaId;
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
    @Column(name = "objeto_id")
    public Integer getObjetoId() {
        return objetoId;
    }

    public void setObjetoId(Integer objetoId) {
        this.objetoId = objetoId;
    }

    @Basic
    @Column(name = "detalle")
    public String getDetalle() {
        return detalle;
    }

    public void setDetalle(String detalle) {
        this.detalle = detalle;
    }

    @Basic
    @Column(name = "timestamp")
    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LogEntity logEntity = (LogEntity) o;
        return id == logEntity.id &&
                Objects.equals(usuarioId, logEntity.usuarioId) &&
                Objects.equals(accionSistemaId, logEntity.accionSistemaId) &&
                Objects.equals(revisionId, logEntity.revisionId) &&
                Objects.equals(objetoId, logEntity.objetoId) &&
                Objects.equals(detalle, logEntity.detalle) &&
                Objects.equals(timestamp, logEntity.timestamp);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, usuarioId, accionSistemaId, revisionId, objetoId, detalle, timestamp);
    }
}
