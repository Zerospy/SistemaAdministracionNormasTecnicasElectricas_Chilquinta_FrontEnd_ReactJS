package cl.desagen.chilquinta.entities;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Objects;

@Entity
@Table(name = "dibujo", schema = "dbo", catalog = "NORMAS")
public class DibujoEntity {
    private int id;
    private Integer componenteId;
    private Integer vistaId;
    private String observacion;
    private byte[] dwg;

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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
    @Column(name = "vista_id")
    public Integer getVistaId() {
        return vistaId;
    }

    public void setVistaId(Integer vistaId) {
        this.vistaId = vistaId;
    }

    @Basic
    @Column(name = "observacion")
    public String getObservacion() {
        return observacion;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    @Basic
    @Column(name = "dwg")
    public byte[] getDwg() {
        return dwg;
    }

    public void setDwg(byte[] dwg) {
        this.dwg = dwg;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DibujoEntity that = (DibujoEntity) o;
        return id == that.id &&
                Objects.equals(componenteId, that.componenteId) &&
                Objects.equals(vistaId, that.vistaId) &&
                Objects.equals(observacion, that.observacion) &&
                Arrays.equals(dwg, that.dwg);
    }

    @Override
    public int hashCode() {

        int result = Objects.hash(id, componenteId, vistaId, observacion);
        result = 31 * result + Arrays.hashCode(dwg);
        return result;
    }
}
