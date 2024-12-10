package psp.pos_system.services.Implementation;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import psp.pos_system.models.Order;
import psp.pos_system.models.enums.OrderStatus;
import psp.pos_system.repositories.OrderRepo;
import psp.pos_system.services.OrderService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepo orderRepo;

    public OrderServiceImpl(OrderRepo orderRepo) {
        this.orderRepo = orderRepo;
    }

    @Override
    public List<Order> getAll() {
        return orderRepo.findAll().stream().toList();
    }

    @Override
    public Order createOrder(UUID employeeId) {
        Order order = new Order();
        order.setEmployeeId(employeeId);
        order.setOrderStatus(OrderStatus.OPEN);
        order.setCreated(LocalDateTime.now());
        return orderRepo.save(order);
    }

    @Override
    public Order getOrderById(UUID orderId) {
        return orderRepo.findById(orderId).orElseThrow(EntityNotFoundException::new);
    }

    @Override
    public void deleteOrderById(UUID id) {

        orderRepo.deleteById(id);
    }

//    @Override
//    public Or updateOrder(UUID id) {
//        var orderToUpdate
//    }


}
