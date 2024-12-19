package psp.pos_system.services.Implementation;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import psp.pos_system.models.DTO.OrderProductsResponse;
import psp.pos_system.models.Order;
import psp.pos_system.models.OrderProduct;
import psp.pos_system.models.enums.OrderStatus;
import psp.pos_system.repositories.OrderRepo;
import psp.pos_system.services.OrderService;

import java.math.BigInteger;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepo orderRepo;

    private final AuthService  authService;

    public OrderServiceImpl(OrderRepo orderRepo, AuthService authService) {
        this.orderRepo = orderRepo;
        this.authService = authService;
    }

    @Override
    public List<Order> getAll() {
        return orderRepo.findAll().stream().toList();
    }

    @Override
    public Order createOrder() {
        Order order = new Order();
        order.setEmployeeId(authService.getLoggedUserID());
        order.setOrderStatus(OrderStatus.OPEN);
        order.setCreated(Timestamp.from(Instant.now()));
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

    public List<OrderProductsResponse> getProductsByOrderId(UUID orderId) {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        Set<OrderProduct> orderProducts = order.getProducts();
        System.out.println(orderProducts);

        List<OrderProductsResponse> orderProductsResponses = orderProducts.stream()
                .map(orderProduct -> {
                    OrderProductsResponse response = new OrderProductsResponse();
                    response.setId(orderProduct.getProduct().getId());
                    response.setName(orderProduct.getProduct().getName());  // Assuming `getProduct()` gives you the Product
                    response.setQuantity(orderProduct.getQuantity());
                    response.setPrice(orderProduct.getPrice());// Assuming `getQuantity()` gives you the quantity
                    return response;
                })
                .collect(Collectors.toList());

        return orderProductsResponses;
    }

    @Override
    public BigInteger calculateOrderPrice(UUID orderId) {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        Set<OrderProduct> orderProducts = order.getProducts();
        BigInteger totalPrice = BigInteger.ZERO;
        for (var orderproduct: orderProducts){
            totalPrice = totalPrice.add(orderproduct.getPrice());
        }
        return totalPrice;
    }
    @Override
    public Order closeOrder(UUID id) {
        Order order = orderRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));
        order.setCompleted(Timestamp.from(Instant.now()));
        order.setOrderStatus(OrderStatus.CLOSED);
        orderRepo.save(order);
        return order;
    }
}
