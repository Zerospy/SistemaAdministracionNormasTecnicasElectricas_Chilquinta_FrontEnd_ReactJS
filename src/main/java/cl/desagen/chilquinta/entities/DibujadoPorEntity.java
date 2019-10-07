package cl.desagen.chilquinta.entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "dibujado_por", schema = "dbo", catalog = "NORMAS")
public class DibujadoPorEntity {
    private int id;
    private Integer revNormaId;
    private String nombre;

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
    @Column(name = "nombre")
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DibujadoPorEntity that = (DibujadoPorEntity) o;
        return id == that.id &&
                Objects.equals(revNormaId, that.revNormaId) &&
                Objects.equals(nombre, that.nombre);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, revNormaId, nombre);
    }
}
