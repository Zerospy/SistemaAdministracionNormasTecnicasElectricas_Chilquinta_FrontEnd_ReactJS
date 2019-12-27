package cl.desagen.chilquinta.entities;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "usuario", schema = "dbo", catalog = "NORMAS")
public class UsuarioEntity {
    private Integer id;
    private String nombres;
    private String apellidos;
    private String usuario;
    private String clave;
    private Boolean estado;
    private Timestamp timestamp;
    private String email;
    private String claveTextoPlano;
    private String avatarBase64;
    private Boolean administrador;


    @Id
    @JsonProperty
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "nombres")
    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    @Basic
    @Column(name = "apellidos")
    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    @Basic
    @Column(name = "usuario")
    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    @Basic
    @Column(name = "clave")
    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    @Basic
    @Column(name = "estado")
    public Boolean getEstado() {
        return estado;
    }

    public void setEstado(Boolean estado) {
        this.estado = estado;
    }

    @Basic
    @Column(name = "timestamp")
    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    @Basic
    @Column(name = "email")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "claveTextoPlano")
    public String getClaveTextoPlano() {
        return claveTextoPlano;
    }

    public void setClaveTextoPlano(String claveTextoPlano) {
        this.claveTextoPlano = claveTextoPlano;
    }

    @Basic
    @Lob
    @Column(name = "avatarBase64")
    public String getAvatarBase64() {
        return avatarBase64;
    }

    public void setAvatarBase64(String avatarBase64) {
        this.avatarBase64 = avatarBase64;
    }

    @Basic
    @Column(name = "administrador")
    public Boolean getAdministrador() {
        return administrador;
    }

    public void setAdministrador(Boolean administrador) {
        this.administrador = administrador;
    }

    @Transient
    public String getFullName() {
        return this.getNombres() + " " + this.getApellidos();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UsuarioEntity that = (UsuarioEntity) o;
        return id == that.id &&
                Objects.equals(nombres, that.nombres) &&
                Objects.equals(apellidos, that.apellidos) &&
                Objects.equals(usuario, that.usuario) &&
                Objects.equals(clave, that.clave) &&
                Objects.equals(estado, that.estado) &&
                Objects.equals(timestamp, that.timestamp) &&
                Objects.equals(email, that.email) &&
                Objects.equals(claveTextoPlano, that.claveTextoPlano);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, nombres, apellidos, usuario, clave, estado, timestamp, email, claveTextoPlano);
    }
}
