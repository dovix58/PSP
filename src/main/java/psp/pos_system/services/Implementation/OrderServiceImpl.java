package psp.pos_system.services.Implementation;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import psp.pos_system.models.DTO.OrderProductsResponse;
import psp.pos_system.models.Keys.OrderProductKey;
import psp.pos_system.models.Order;
import psp.pos_system.models.OrderProduct;
import psp.pos_system.models.enums.OrderStatus;
import psp.pos_system.repositories.OrderProductRepo;
import psp.pos_system.repositories.OrderRepo;
import psp.pos_system.repositories.ProductRepo;
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
    private final OrderProductRepo orderProductRepo;
    private final ProductRepo productRepo;

    public OrderServiceImpl(OrderRepo orderRepo, OrderProductRepo orderProductRepo, ProductRepo productRepo) {
        this.orderRepo = orderRepo;
        this.orderProductRepo = orderProductRepo;
        this.productRepo = productRepo;
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
        order.setCreated(Timestamp.from(Instant.now()));
        return orderRepo.save(order);
    }

    @Override
    public Order getOrderById(UUID orderId) {
        return orderRepo.findById(orderId).orElseThrow(EntityNotFoundException::new);
    }

    @Override
    public void deleteOrderById(UUID id) {
        List<OrderProduct> orderProductList = orderProductRepo.findOrderProductsById_OrderId(id);
        for (OrderProduct orderProduct : orderProductList) {
            var product = productRepo.findById(orderProduct.getProduct().getId()).orElseThrow(() -> new RuntimeException("Product not found"));
            product.setQuantity(product.getQuantity() + orderProduct.getQuantity());

            productRepo.save(product);
            orderProduct.setProduct(product);
        }

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
        if (order.getOrderStatus() != OrderStatus.OPEN)
            throw new RuntimeException("Open order can not be refunded");
        order.setCompleted(Timestamp.from(Instant.now()));
        order.setOrderStatus(OrderStatus.CLOSED);
        orderRepo.save(order);
        return order;
    }

    @Override
    public Order refundOrder(UUID id) {
        Order order = orderRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));
        if (order.getOrderStatus() != OrderStatus.CLOSED)
            throw new RuntimeException("Open order can not be refunded");
        order.setOrderStatus(OrderStatus.REFUNDED);
        order.setUpdated(Timestamp.from(Instant.now()));
        orderRepo.save(order);
        return order;
    }
}
