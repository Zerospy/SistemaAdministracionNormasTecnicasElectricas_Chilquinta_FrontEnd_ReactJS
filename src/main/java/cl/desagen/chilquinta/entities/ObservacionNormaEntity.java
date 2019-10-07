package cl.desagen.chilquinta.entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "observacion_norma", schema = "dbo", catalog = "NORMAS")
public class ObservacionNormaEntity {
    private int id;
    private Integer revNormaId;
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
        ObservacionNormaEntity that = (ObservacionNormaEntity) o;
        return id == that.id &&
                Objects.equals(revNormaId, that.revNormaId) &&
                Objects.equals(observacion, that.observacion);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, revNormaId, observacion);
    }
}
