package psp.pos_system.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import psp.pos_system.models.DTO.CreateEmployeeRequest;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserManagementController {

    private final List<UserDetails> userList;

    private final InMemoryUserDetailsManager userDetailsManager;

    public UserManagementController(List<UserDetails> userList, InMemoryUserDetailsManager userDetailsManager) {
        this.userList = userList;
        this.userDetailsManager = userDetailsManager;
    }

    @GetMapping
    public List<UserDetails> getUsers() {
        return userList;
    }

    @PostMapping()
    public ResponseEntity<String> addUser(@RequestBody CreateEmployeeRequest userDTO) {
        if (userDetailsManager.userExists(userDTO.getUsername())) {
            return ResponseEntity.badRequest().body("User already exists");
        }

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(userDTO.getPassword());

        UserDetails newUser = User.builder()
                .username(userDTO.getUsername())
                .password(encodedPassword)
                .authorities(userDTO.getRoles().toArray(new String[0]))
                .build();

        // Create the user in the system
        userDetailsManager.createUser(newUser);

        return ResponseEntity.ok("User added successfully");
    }



    @DeleteMapping("/{username}")
    public ResponseEntity<String> removeUser(@PathVariable String username) {
        if (!userDetailsManager.userExists(username)) {
            return ResponseEntity.badRequest().body("User does not exist");
        }
        userDetailsManager.deleteUser(username);
        return ResponseEntity.ok("User removed successfully");
    }
}