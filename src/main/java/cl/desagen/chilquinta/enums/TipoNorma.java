package cl.desagen.chilquinta.enums;

public enum TipoNorma {

    NACIONAL(1),
    INTERNACIONAL(2);

    public final Integer value;

    private TipoNorma(Integer value) {
        this.value = value;
    }
}
