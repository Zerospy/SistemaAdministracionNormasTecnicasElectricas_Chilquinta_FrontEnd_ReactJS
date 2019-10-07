package cl.desagen.chilquinta.entities;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Objects;

@Entity
@Table(name = "sysdiagrams", schema = "dbo", catalog = "NORMAS")
public class SysdiagramsEntity {
    private String name;
    private int principalId;
    private int diagramId;
    private Integer version;
    private byte[] definition;

    @Basic
    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "principal_id")
    public int getPrincipalId() {
        return principalId;
    }

    public void setPrincipalId(int principalId) {
        this.principalId = principalId;
    }

    @Id
    @Column(name = "diagram_id")
    public int getDiagramId() {
        return diagramId;
    }

    public void setDiagramId(int diagramId) {
        this.diagramId = diagramId;
    }

    @Basic
    @Column(name = "version")
    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    @Basic
    @Column(name = "definition")
    public byte[] getDefinition() {
        return definition;
    }

    public void setDefinition(byte[] definition) {
        this.definition = definition;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SysdiagramsEntity that = (SysdiagramsEntity) o;
        return principalId == that.principalId &&
                diagramId == that.diagramId &&
                Objects.equals(name, that.name) &&
                Objects.equals(version, that.version) &&
                Arrays.equals(definition, that.definition);
    }

    @Override
    public int hashCode() {

        int result = Objects.hash(name, principalId, diagramId, version);
        result = 31 * result + Arrays.hashCode(definition);
        return result;
    }
}
