package psp.pos_system.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
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

    private final CustomLoginSuccessHandler customLoginSuccessHandler;

    public SecurityConfig(CustomLogoutSuccessHandler customLogoutSuccessHandler, CustomLoginSuccessHandler customLoginSuccessHandler) {
        this.customLogoutSuccessHandler = customLogoutSuccessHandler;
        this.customLoginSuccessHandler = customLoginSuccessHandler;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf().disable()
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/**").hasAuthority("ROLE_EMPLOYEE")
                        .requestMatchers("/api/user").hasAuthority("ROLE_OWNER")
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
                .formLogin(formLogin -> formLogin
                    .successHandler(customLoginSuccessHandler))
                .build();
    }



    @Bean
    public List<UserDetails> userList(PasswordEncoder passwordEncoder) {
        UserDetails employee = User.builder()
                .username("employee")
                .password(passwordEncoder.encode("123"))
                .authorities("ROLE_EMPLOYEE")
                .build();
        UserDetails owner = User.builder()
                .username("owner")
                .password(passwordEncoder.encode("123"))
                .authorities("ROLE_OWNER", "ROLE_EMPLOYEE")
                .build();

        return List.of(employee, owner);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
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
