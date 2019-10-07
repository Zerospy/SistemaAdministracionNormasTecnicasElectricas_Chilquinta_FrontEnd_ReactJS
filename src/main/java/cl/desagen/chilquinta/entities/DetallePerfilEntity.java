package cl.desagen.chilquinta.entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "detalle_perfil", schema = "dbo", catalog = "NORMAS")
public class DetallePerfilEntity {
    private int id;
    private Integer usuarioId;
    private Integer perfilId;

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "usuario_id")
    public Integer getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Integer usuarioId) {
        this.usuarioId = usuarioId;
    }

    @Basic
    @Column(name = "perfil_id")
    public Integer getPerfilId() {
        return perfilId;
    }

    public void setPerfilId(Integer perfilId) {
        this.perfilId = perfilId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DetallePerfilEntity that = (DetallePerfilEntity) o;
        return id == that.id &&
                Objects.equals(usuarioId, that.usuarioId) &&
                Objects.equals(perfilId, that.perfilId);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, usuarioId, perfilId);
    }
}
