package psp.pos_system.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import psp.pos_system.models.Employee;

import java.util.UUID;
@Repository
public interface EmployeeRepo extends JpaRepository<Employee, UUID> {
    Employee findByUsername(String username);

}
