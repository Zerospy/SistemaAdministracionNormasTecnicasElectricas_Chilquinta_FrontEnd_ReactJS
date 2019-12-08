package cl.desagen.chilquinta.security;

import lombok.Data;

@Data
public class JwtResponse extends SessionUser {

    private final String jwttoken;

    public JwtResponse(SessionUser userDetails, String jwttoken) {
        super(userDetails.getUsername(), userDetails.getPassword(), userDetails.getAuthorities());
        this.setId(userDetails.getId());
        this.setAdmin(userDetails.getAdmin());
        this.jwttoken = jwttoken;
    }

}