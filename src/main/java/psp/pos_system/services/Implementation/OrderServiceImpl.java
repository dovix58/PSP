package psp.pos_system.services.Implementation;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import psp.pos_system.models.Order;
import psp.pos_system.models.OrderProduct;
import psp.pos_system.models.Product;
import psp.pos_system.models.enums.OrderStatus;
import psp.pos_system.repositories.OrderRepo;
import psp.pos_system.services.OrderService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

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

    public List<Product> getProductsByOrderId(UUID orderId) {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));


        Set<OrderProduct> orderProducts = order.getProducts();
        System.out.println(orderProducts);
        List<Product> products = orderProducts.stream()
                .map(OrderProduct::getProduct)
                .collect(Collectors.toList());
        System.out.println(products);
        return products;

    }


//    @Override
//    public Or updateOrder(UUID id) {
//        var orderToUpdate
//    }


}
