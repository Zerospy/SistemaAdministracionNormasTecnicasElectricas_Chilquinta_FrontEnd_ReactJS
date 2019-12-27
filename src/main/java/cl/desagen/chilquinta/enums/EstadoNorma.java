package cl.desagen.chilquinta.enums;

public enum EstadoNorma {

    EN_REVISION(1),
    CON_COMENTARIOS(2),
    PUBLICADA(3),
    DADA_DE_BAJA(4);

    public final Integer value;

    private EstadoNorma(Integer value) {
        this.value = value;
    }
}
