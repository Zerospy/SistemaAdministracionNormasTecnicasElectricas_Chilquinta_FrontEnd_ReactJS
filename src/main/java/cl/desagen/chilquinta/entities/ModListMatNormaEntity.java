package cl.desagen.chilquinta.entities;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "mod_list_mat_norma", schema = "dbo", catalog = "NORMAS")
public class ModListMatNormaEntity {
    private Long id;
    private Integer revisionId;
    private Integer normaId;
    private Integer tipo;
    private Integer estado;
    private Timestamp timestamp;

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
    @Column(name = "norma_id")
    public Integer getNormaId() {
        return normaId;
    }

    public void setNormaId(Integer normaId) {
        this.normaId = normaId;
    }

    @Basic
    @Column(name = "tipo")
    public Integer getTipo() {
        return tipo;
    }

    public void setTipo(Integer tipo) {
        this.tipo = tipo;
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
        ModListMatNormaEntity that = (ModListMatNormaEntity) o;
        return id == that.id &&
                Objects.equals(revisionId, that.revisionId) &&
                Objects.equals(normaId, that.normaId) &&
                Objects.equals(tipo, that.tipo) &&
                Objects.equals(estado, that.estado) &&
                Objects.equals(timestamp, that.timestamp);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, revisionId, normaId, tipo, estado, timestamp);
    }
}
