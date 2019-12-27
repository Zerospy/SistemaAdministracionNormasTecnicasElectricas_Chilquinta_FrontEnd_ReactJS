package cl.desagen.chilquinta.entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "listado_mat_dibujo", schema = "dbo", catalog = "NORMAS")
public class ListadoMatDibujoEntity {
    private Long id;
    private Integer listadoMatId;
    private Integer dibujoId;
    private Integer componenteId;
    private Integer cantidad;
    private Integer rotacion;

    @Id
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "listado_mat_id")
    public Integer getListadoMatId() {
        return listadoMatId;
    }

    public void setListadoMatId(Integer listadoMatId) {
        this.listadoMatId = listadoMatId;
    }

    @Basic
    @Column(name = "dibujo_id")
    public Integer getDibujoId() {
        return dibujoId;
    }

    public void setDibujoId(Integer dibujoId) {
        this.dibujoId = dibujoId;
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
    @Column(name = "cantidad")
    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    @Basic
    @Column(name = "rotacion")
    public Integer getRotacion() {
        return rotacion;
    }

    public void setRotacion(Integer rotacion) {
        this.rotacion = rotacion;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ListadoMatDibujoEntity that = (ListadoMatDibujoEntity) o;
        return id == that.id &&
                Objects.equals(listadoMatId, that.listadoMatId) &&
                Objects.equals(dibujoId, that.dibujoId) &&
                Objects.equals(componenteId, that.componenteId) &&
                Objects.equals(cantidad, that.cantidad) &&
                Objects.equals(rotacion, that.rotacion);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, listadoMatId, dibujoId, componenteId, cantidad, rotacion);
    }
}
