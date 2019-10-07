package cl.desagen.chilquinta.entities;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "norma", schema = "dbo", catalog = "NORMAS")
public class NormaEntity {
    private int id;
    private String codNorma;
    private String nombre;
    private String descripcion;
    private Integer estado;
    private Timestamp fecha;
    private Integer tipoTabla;
    private String urlPdf;
    private String urlCad;

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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
    @Column(name = "nombre")
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
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
    @Column(name = "fecha")
    public Timestamp getFecha() {
        return fecha;
    }

    public void setFecha(Timestamp fecha) {
        this.fecha = fecha;
    }

    @Basic
    @Column(name = "tipo_tabla")
    public Integer getTipoTabla() {
        return tipoTabla;
    }

    public void setTipoTabla(Integer tipoTabla) {
        this.tipoTabla = tipoTabla;
    }

    @Basic
    @Column(name = "Url_pdf")
    public String getUrlPdf() {
        return urlPdf;
    }

    public void setUrlPdf(String urlPdf) {
        this.urlPdf = urlPdf;
    }

    @Basic
    @Column(name = "Url_cad")
    public String getUrlCad() {
        return urlCad;
    }

    public void setUrlCad(String urlCad) {
        this.urlCad = urlCad;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        NormaEntity that = (NormaEntity) o;
        return id == that.id &&
                Objects.equals(codNorma, that.codNorma) &&
                Objects.equals(nombre, that.nombre) &&
                Objects.equals(descripcion, that.descripcion) &&
                Objects.equals(estado, that.estado) &&
                Objects.equals(fecha, that.fecha) &&
                Objects.equals(tipoTabla, that.tipoTabla) &&
                Objects.equals(urlPdf, that.urlPdf) &&
                Objects.equals(urlCad, that.urlCad);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, codNorma, nombre, descripcion, estado, fecha, tipoTabla, urlPdf, urlCad);
    }
}
