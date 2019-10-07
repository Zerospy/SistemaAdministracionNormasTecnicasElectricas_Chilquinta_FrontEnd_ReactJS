package cl.desagen.chilquinta.entities;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "mod_list_mat_comp", schema = "dbo", catalog = "NORMAS")
public class ModListMatCompEntity {
    private int id;
    private Integer revisionNormaId;
    private Integer componenteId;
    private Integer componenteModId;
    private Integer tipo;
    private Integer estado;
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
    @Column(name = "revision_norma_id")
    public Integer getRevisionNormaId() {
        return revisionNormaId;
    }

    public void setRevisionNormaId(Integer revisionNormaId) {
        this.revisionNormaId = revisionNormaId;
    }

    @Basic
    @Column(name = "componente_id")
    public Integer getComponenteId() {
        return componenteId;
    }

    public void setComponenteId(Integer componenteId) {
        this.componenteId = componenteId;
    }

    @Basic
    @Column(name = "componente_mod_id")
    public Integer getComponenteModId() {
        return componenteModId;
    }

    public void setComponenteModId(Integer componenteModId) {
        this.componenteModId = componenteModId;
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
        ModListMatCompEntity that = (ModListMatCompEntity) o;
        return id == that.id &&
                Objects.equals(revisionNormaId, that.revisionNormaId) &&
                Objects.equals(componenteId, that.componenteId) &&
                Objects.equals(componenteModId, that.componenteModId) &&
                Objects.equals(tipo, that.tipo) &&
                Objects.equals(estado, that.estado) &&
                Objects.equals(timestamp, that.timestamp);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, revisionNormaId, componenteId, componenteModId, tipo, estado, timestamp);
    }
}
