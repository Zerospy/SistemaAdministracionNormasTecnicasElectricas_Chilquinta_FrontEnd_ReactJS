package cl.desagen.chilquinta.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource(value = "file:application.properties", ignoreResourceNotFound = true)
public class ChilquintaConfiguration {
}
