package cl.desagen.chilquinta.dto;

import lombok.Data;

@Data
public class DashboardDto {

    private Integer cantidadNormas;

    private Integer cantidadNormasPublicadas;

    private Integer cantidadArchivos;

    private Integer cantidadNormasDescargadas;

    private Integer cantidadNormasComentadas;

    private Integer cantidadNormasEnWorkflow;

    public DashboardDto(Integer cantidadNormas, Integer cantidadNormasPublicadas, Integer cantidadArchivos, Integer cantidadNormasDescargadas, Integer cantidadNormasComentadas, Integer cantidadNormasEnWorkflow) {
        this.cantidadNormas = cantidadNormas;
        this.cantidadNormasPublicadas = cantidadNormasPublicadas;
        this.cantidadArchivos = cantidadArchivos;
        this.cantidadNormasDescargadas = cantidadNormasDescargadas;
        this.cantidadNormasComentadas = cantidadNormasComentadas;
        this.cantidadNormasEnWorkflow = cantidadNormasEnWorkflow;
    }
}
