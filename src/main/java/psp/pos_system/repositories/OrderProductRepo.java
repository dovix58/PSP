package psp.pos_system.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import psp.pos_system.models.Keys.OrderProductKey;
import psp.pos_system.models.OrderProduct;

import java.util.UUID;

@Repository
public interface OrderProductRepo extends JpaRepository<OrderProduct, OrderProductKey> {
    boolean existsById(OrderProductKey id);
}
