package cl.desagen.chilquinta.entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "materiales_sap", schema = "dbo", catalog = "NORMAS")
public class MaterialesSapEntity {
    private String codSap;
    private String codNorma;
    private String descripcion;
    private Integer estado;
    private Double precioSap;
    private String unidadCompra;
    private String unidadEquiv;
    private Double precioEquiv;
    private String factor;
    private String noSap;

    @Id
    @Column(name = "cod_sap")
    public String getCodSap() {
        return codSap;
    }

    public void setCodSap(String codSap) {
        this.codSap = codSap;
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
    @Column(name = "descripcion")
    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    @Basic
    @Column(name = "estado")
    public Integer getEstado() {
        return estado;
    }

    public void setEstado(Integer estado) {
        this.estado = estado;
    }

    @Basic
    @Column(name = "precio_sap")
    public Double getPrecioSap() {
        return precioSap;
    }

    public void setPrecioSap(Double precioSap) {
        this.precioSap = precioSap;
    }

    @Basic
    @Column(name = "unidad_compra")
    public String getUnidadCompra() {
        return unidadCompra;
    }

    public void setUnidadCompra(String unidadCompra) {
        this.unidadCompra = unidadCompra;
    }

    @Basic
    @Column(name = "unidad_equiv")
    public String getUnidadEquiv() {
        return unidadEquiv;
    }

    public void setUnidadEquiv(String unidadEquiv) {
        this.unidadEquiv = unidadEquiv;
    }

    @Basic
    @Column(name = "precio_equiv")
    public Double getPrecioEquiv() {
        return precioEquiv;
    }

    public void setPrecioEquiv(Double precioEquiv) {
        this.precioEquiv = precioEquiv;
    }

    @Basic
    @Column(name = "factor")
    public String getFactor() {
        return factor;
    }

    public void setFactor(String factor) {
        this.factor = factor;
    }

    @Basic
    @Column(name = "no_sap")
    public String getNoSap() {
        return noSap;
    }

    public void setNoSap(String noSap) {
        this.noSap = noSap;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MaterialesSapEntity that = (MaterialesSapEntity) o;
        return Objects.equals(codSap, that.codSap) &&
                Objects.equals(codNorma, that.codNorma) &&
                Objects.equals(descripcion, that.descripcion) &&
                Objects.equals(estado, that.estado) &&
                Objects.equals(precioSap, that.precioSap) &&
                Objects.equals(unidadCompra, that.unidadCompra) &&
                Objects.equals(unidadEquiv, that.unidadEquiv) &&
                Objects.equals(precioEquiv, that.precioEquiv) &&
                Objects.equals(factor, that.factor) &&
                Objects.equals(noSap, that.noSap);
    }

    @Override
    public int hashCode() {

        return Objects.hash(codSap, codNorma, descripcion, estado, precioSap, unidadCompra, unidadEquiv, precioEquiv, factor, noSap);
    }
}
