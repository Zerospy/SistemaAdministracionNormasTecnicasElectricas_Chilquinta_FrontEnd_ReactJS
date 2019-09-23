package cl.desagen.chilquinta.dto;

import lombok.Data;

import javax.xml.bind.annotation.XmlRootElement;

@Data
@XmlRootElement
public class BaseResponse {

    private static final String MSG_OK = "OK";
    private static final String MSG_ERROR = "ERROR";

    private int code;

    private String description;

    public BaseResponse() {
    }

    public BaseResponse(int code, String description) {
        this.code = code;
        this.description = description;
    }

    public static BaseResponse ok() {
        return new BaseResponse(0, MSG_OK);
    }

    public static BaseResponse error() {
        return new BaseResponse(1, MSG_ERROR);
    }

}
