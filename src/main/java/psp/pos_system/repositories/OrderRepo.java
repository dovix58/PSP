package psp.pos_system.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import psp.pos_system.models.Order;

import java.util.UUID;
@Repository
public interface OrderRepo extends JpaRepository<Order, UUID> {
}
