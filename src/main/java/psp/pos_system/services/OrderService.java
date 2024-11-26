package psp.pos_system.services;

import org.aspectj.weaver.ast.Or;
import psp.pos_system.models.Order;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OrderService {

    List<Order> getAll();

    Order createOrder(UUID userId);

    Order getOrderById(UUID orderId);

    void deleteOrderById(UUID id);

//    Or updateOrder(UUID id);
}
