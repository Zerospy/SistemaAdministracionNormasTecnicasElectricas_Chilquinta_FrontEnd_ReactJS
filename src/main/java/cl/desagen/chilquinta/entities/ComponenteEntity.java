package cl.desagen.chilquinta.entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "componente", schema = "dbo", catalog = "NORMAS")
public class ComponenteEntity {
    private Long id;
    private String codSap;
    private String nombre;
    private String codNorma;
    private String tipo;
    private Integer estado;

    @Id
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "cod_sap")
    public String getCodSap() {
        return codSap;
    }

    public void setCodSap(String codSap) {
        this.codSap = codSap;
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
    @Column(name = "cod_norma")
    public String getCodNorma() {
        return codNorma;
    }

    public void setCodNorma(String codNorma) {
        this.codNorma = codNorma;
    }

    @Basic
    @Column(name = "tipo")
    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ComponenteEntity that = (ComponenteEntity) o;
        return id == that.id &&
                Objects.equals(codSap, that.codSap) &&
                Objects.equals(nombre, that.nombre) &&
                Objects.equals(codNorma, that.codNorma) &&
                Objects.equals(tipo, that.tipo) &&
                Objects.equals(estado, that.estado);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, codSap, nombre, codNorma, tipo, estado);
    }
}
