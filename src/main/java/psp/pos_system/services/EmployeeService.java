package psp.pos_system.services;

import psp.pos_system.models.Employee;

import java.util.List;
import java.util.UUID;

public interface EmployeeService {

    List<Employee> getEmployees();

    Employee getEmployee(UUID id);

    Employee createEmployee(Employee employee);
}
