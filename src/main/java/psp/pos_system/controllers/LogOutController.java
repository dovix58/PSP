package psp.pos_system.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/logout")
public class LogOutController {

    @GetMapping()
    public String logout(){
        return "Logged Out";
    }

}
