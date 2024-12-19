package psp.pos_system.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig{

    private final CustomLogoutSuccessHandler customLogoutSuccessHandler;

    public SecurityConfig(CustomLogoutSuccessHandler customLogoutSuccessHandler) {
        this.customLogoutSuccessHandler = customLogoutSuccessHandler;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf().disable()
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/v1/products").hasAuthority("EMPLOYEE_READ")
                        .requestMatchers("/api/user").authenticated()
                        .anyRequest().authenticated()

                )
                .logout((logout) -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/login?logout")
                        .invalidateHttpSession(true)
                        .clearAuthentication(true)
                        .logoutSuccessHandler(customLogoutSuccessHandler)
                        .deleteCookies("JSESSIONID")
                        .permitAll()
                )
                .formLogin(Customizer.withDefaults())
                
                .build();
    }



    @Bean
    public List<UserDetails> userList() {
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
        return List.of(employee, owner);
    }

    @Bean
    public InMemoryUserDetailsManager users(List<UserDetails> userList) {
        return new InMemoryUserDetailsManager(userList);
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
