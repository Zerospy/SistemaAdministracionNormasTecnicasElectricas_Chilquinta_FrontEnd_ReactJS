package cl.desagen.chilquinta.entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "Estados", schema = "dbo", catalog = "NORMAS")
public class EstadosEntity {
    private int idEstado;
    private String descripcionEstado;

    @Id
    @Column(name = "idEstado")
    public int getIdEstado() {
        return idEstado;
    }

    public void setIdEstado(int idEstado) {
        this.idEstado = idEstado;
    }

    @Basic
    @Column(name = "DescripcionEstado")
    public String getDescripcionEstado() {
        return descripcionEstado;
    }

    public void setDescripcionEstado(String descripcionEstado) {
        this.descripcionEstado = descripcionEstado;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EstadosEntity that = (EstadosEntity) o;
        return idEstado == that.idEstado &&
                Objects.equals(descripcionEstado, that.descripcionEstado);
    }

    @Override
    public int hashCode() {

        return Objects.hash(idEstado, descripcionEstado);
    }
}
