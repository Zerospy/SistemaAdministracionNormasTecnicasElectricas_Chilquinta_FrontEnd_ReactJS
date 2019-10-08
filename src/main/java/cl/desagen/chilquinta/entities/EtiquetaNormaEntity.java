package cl.desagen.chilquinta.entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "etiqueta_norma", schema = "dbo", catalog = "NORMAS")
public class EtiquetaNormaEntity {
    private Long id;
    private int normaId;
    private int etiquetaId;

    @Id
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "norma_id")
    public int getNormaId() {
        return normaId;
    }

    public void setNormaId(int normaId) {
        this.normaId = normaId;
    }

    @Basic
    @Column(name = "etiqueta_id")
    public int getEtiquetaId() {
        return etiquetaId;
    }

    public void setEtiquetaId(int etiquetaId) {
        this.etiquetaId = etiquetaId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EtiquetaNormaEntity that = (EtiquetaNormaEntity) o;
        return id == that.id &&
                normaId == that.normaId &&
                etiquetaId == that.etiquetaId;
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, normaId, etiquetaId);
    }
}
