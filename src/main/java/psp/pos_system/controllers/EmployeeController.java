package psp.pos_system.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Slf4j
@RestController
public class EmployeeController {

    @GetMapping("/api/v1/user")
    public Map<String, Object> getUserDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        log.debug("Authentication: " + authentication);

        if (authentication != null) {
            UserDetails principal = (UserDetails)authentication.getPrincipal();
            log.debug("Principal: " + principal); // Log the principal
            log.debug("Principal Class: " + principal.getClass().getName()); // Log the class of principal

            return Map.of(
                    "username", principal.getUsername(),
                    "authorities", principal.getAuthorities()
            );
        }

        return Map.of("error", "User not authenticated");
    }
}
