package cl.desagen.chilquinta.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Data
@Table(name = "observacion_norma", schema = "dbo", catalog = "NORMAS")
public class ObservacionNormaEntity {

    private Long id;

    private Integer normaId;

    private String observacion;

    private UsuarioEntity usuarioEntity;

    private Timestamp createdAt;

    private Timestamp updatedAt;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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
    @Column(name = "observacion")
    public String getObservacion() {
        return observacion;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    @JsonProperty
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    public UsuarioEntity getUsuarioEntity() {
        return usuarioEntity;
    }

    public void setUsuarioEntity(UsuarioEntity usuarioEntity) {
        this.usuarioEntity = usuarioEntity;
    }

    @Column(name = "created_at")
    @CreationTimestamp
    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    @Column(name = "updated_at")
    @UpdateTimestamp
    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ObservacionNormaEntity that = (ObservacionNormaEntity) o;
        return id == that.id &&
                Objects.equals(normaId, that.normaId) &&
                Objects.equals(observacion, that.observacion);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, normaId, observacion);
    }
}
