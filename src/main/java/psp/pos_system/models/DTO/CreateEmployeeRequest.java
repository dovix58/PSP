package psp.pos_system.models.DTO;

import lombok.Data;

import java.util.List;
@Data
public class CreateEmployeeRequest {

        private String username;
        private String password;
        private List<String> roles;


}
