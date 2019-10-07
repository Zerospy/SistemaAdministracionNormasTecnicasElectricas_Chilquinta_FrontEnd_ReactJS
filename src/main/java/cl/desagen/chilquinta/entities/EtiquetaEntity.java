package cl.desagen.chilquinta.entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "etiqueta", schema = "dbo", catalog = "NORMAS")
public class EtiquetaEntity {
    private int id;
    private String etiqueta;
    private Integer nivel;

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "etiqueta")
    public String getEtiqueta() {
        return etiqueta;
    }

    public void setEtiqueta(String etiqueta) {
        this.etiqueta = etiqueta;
    }

    @Basic
    @Column(name = "nivel")
    public Integer getNivel() {
        return nivel;
    }

    public void setNivel(Integer nivel) {
        this.nivel = nivel;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EtiquetaEntity that = (EtiquetaEntity) o;
        return id == that.id &&
                Objects.equals(etiqueta, that.etiqueta) &&
                Objects.equals(nivel, that.nivel);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, etiqueta, nivel);
    }
}
