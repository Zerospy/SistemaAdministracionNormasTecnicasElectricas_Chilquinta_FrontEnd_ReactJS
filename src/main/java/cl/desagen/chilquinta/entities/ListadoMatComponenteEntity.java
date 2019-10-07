package cl.desagen.chilquinta.entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "listado_mat_componente", schema = "dbo", catalog = "NORMAS")
public class ListadoMatComponenteEntity {
    private int id;
    private Integer revNormaId;
    private Integer componenteId;
    private Integer cantidad;
    private String descripcion;
    private Integer listar;
    private Integer kv;

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
    @Column(name = "descripcion")
    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    @Basic
    @Column(name = "listar")
    public Integer getListar() {
        return listar;
    }

    public void setListar(Integer listar) {
        this.listar = listar;
    }

    @Basic
    @Column(name = "kv")
    public Integer getKv() {
        return kv;
    }

    public void setKv(Integer kv) {
        this.kv = kv;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ListadoMatComponenteEntity that = (ListadoMatComponenteEntity) o;
        return id == that.id &&
                Objects.equals(revNormaId, that.revNormaId) &&
                Objects.equals(componenteId, that.componenteId) &&
                Objects.equals(cantidad, that.cantidad) &&
                Objects.equals(descripcion, that.descripcion) &&
                Objects.equals(listar, that.listar) &&
                Objects.equals(kv, that.kv);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, revNormaId, componenteId, cantidad, descripcion, listar, kv);
    }
}
