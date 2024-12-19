package psp.pos_system.services.Implementation;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import psp.pos_system.models.Employee;
import psp.pos_system.repositories.EmployeeRepo;
import psp.pos_system.services.EmployeeService;

import java.util.List;
import java.util.UUID;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepo employeeRepo;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public EmployeeServiceImpl(EmployeeRepo employeeRepo, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.employeeRepo = employeeRepo;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public List<Employee> getEmployees() {
        return employeeRepo.findAll();
    }

    @Override
    public Employee getEmployee(UUID id) {
        return employeeRepo.findById(id).orElseThrow(() -> new RuntimeException("Employee ID not found"));
    }

    @Override
    public Employee createEmployee(Employee employee) {
        employee.setPassword(bCryptPasswordEncoder.encode(employee.getPassword()));
        return employeeRepo.save(employee);
    }
}
