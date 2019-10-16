package cl.desagen.chilquinta.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name = "Estados", schema = "dbo", catalog = "NORMAS")
public class EstadosEntity implements Serializable {

    @Id
    @JsonProperty
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    @JsonProperty
    @Column(name = "DescripcionEstado")
    private String descripcion;

}
