package cl.desagen.chilquinta.entities;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "comentario_norma", schema = "dbo", catalog = "NORMAS")
public class ComentarioNormaEntity {
    private int id;
    private int normaId;
    private int usuarioId;
    private Timestamp fechaHora;
    private String comentario;

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "norma_id")
    public int getNormaId() {
        return normaId;
    }

    public void setNormaId(int normaId) {
        this.normaId = normaId;
    }

    @Basic
    @Column(name = "usuario_id")
    public int getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(int usuarioId) {
        this.usuarioId = usuarioId;
    }

    @Basic
    @Column(name = "fecha_hora")
    public Timestamp getFechaHora() {
        return fechaHora;
    }

    public void setFechaHora(Timestamp fechaHora) {
        this.fechaHora = fechaHora;
    }

    @Basic
    @Column(name = "comentario")
    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ComentarioNormaEntity that = (ComentarioNormaEntity) o;
        return id == that.id &&
                normaId == that.normaId &&
                usuarioId == that.usuarioId &&
                Objects.equals(fechaHora, that.fechaHora) &&
                Objects.equals(comentario, that.comentario);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, normaId, usuarioId, fechaHora, comentario);
    }
}
