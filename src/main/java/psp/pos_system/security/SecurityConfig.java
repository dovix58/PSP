package psp.pos_system.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig{
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf().disable() // Disable CSRF (use with caution)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/v1/products").hasAuthority("EMPLOYEE_READ")
                        .anyRequest().authenticated() // Require authentication for all other requests

                )
                .logout((logout) -> logout
                        .logoutSuccessUrl("/my/success/endpoint")
                        .permitAll()
                )
                .httpBasic(Customizer.withDefaults()) // Enable basic HTTP authentication
                .build();
    }

    @Bean
    public UserDetailsService users() {
        UserDetails employee = User.builder()
                .username("emp")
                .password("{noop}emp")
                .authorities("ROLE_EMPLOYEE")
                .build();
        UserDetails owner = User.builder()
                .username("owner")
                .password("{noop}owner")
                .authorities("ROLE_OWNER", "EMPLOYEE_READ", "EMPLOYEE_WRITE")
                .build();
        return new InMemoryUserDetailsManager(employee, owner );
    }
    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(List.of("http://localhost:5173"));
        corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.addAllowedHeader("*");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }

}
