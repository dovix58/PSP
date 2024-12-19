package psp.pos_system.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import psp.pos_system.models.Employee;
import psp.pos_system.repositories.EmployeeRepo;

@Service
public class MyUserDetailsService implements UserDetailsService {

    private final EmployeeRepo employeeRepo;

    public MyUserDetailsService(EmployeeRepo employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Employee employee = employeeRepo.findByUsername(username);

        if(employee == null){
            throw new UsernameNotFoundException("This user does not exist");
        }
        return new EmployeePrincipal(employee);
    }
}
