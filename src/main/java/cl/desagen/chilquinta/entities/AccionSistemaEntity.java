package cl.desagen.chilquinta.entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "accion_sistema", schema = "dbo", catalog = "NORMAS")
public class AccionSistemaEntity {
    private Long id;
    private String nombre;
    private Integer objeto;

    @Id
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "nombre")
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    @Basic
    @Column(name = "objeto")
    public Integer getObjeto() {
        return objeto;
    }

    public void setObjeto(Integer objeto) {
        this.objeto = objeto;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AccionSistemaEntity that = (AccionSistemaEntity) o;
        return id == that.id &&
                Objects.equals(nombre, that.nombre) &&
                Objects.equals(objeto, that.objeto);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, nombre, objeto);
    }
}
