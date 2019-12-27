package cl.desagen.chilquinta.entities;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Objects;

@Entity
@Table(name = "lamina_norma", schema = "dbo", catalog = "NORMAS")
public class LaminaNormaEntity {
    private Long id;
    private Integer revNormaId;
    private String nroPlano;
    private Integer nroLamina;
    private byte[] dwg;
    private byte[] pdf;

    @Id
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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
    @Column(name = "nro_plano")
    public String getNroPlano() {
        return nroPlano;
    }

    public void setNroPlano(String nroPlano) {
        this.nroPlano = nroPlano;
    }

    @Basic
    @Column(name = "nro_lamina")
    public Integer getNroLamina() {
        return nroLamina;
    }

    public void setNroLamina(Integer nroLamina) {
        this.nroLamina = nroLamina;
    }

    @Basic
    @Column(name = "dwg")
    public byte[] getDwg() {
        return dwg;
    }

    public void setDwg(byte[] dwg) {
        this.dwg = dwg;
    }

    @Basic
    @Column(name = "pdf")
    public byte[] getPdf() {
        return pdf;
    }

    public void setPdf(byte[] pdf) {
        this.pdf = pdf;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LaminaNormaEntity that = (LaminaNormaEntity) o;
        return id == that.id &&
                Objects.equals(revNormaId, that.revNormaId) &&
                Objects.equals(nroPlano, that.nroPlano) &&
                Objects.equals(nroLamina, that.nroLamina) &&
                Arrays.equals(dwg, that.dwg) &&
                Arrays.equals(pdf, that.pdf);
    }

    @Override
    public int hashCode() {

        int result = Objects.hash(id, revNormaId, nroPlano, nroLamina);
        result = 31 * result + Arrays.hashCode(dwg);
        result = 31 * result + Arrays.hashCode(pdf);
        return result;
    }
}
