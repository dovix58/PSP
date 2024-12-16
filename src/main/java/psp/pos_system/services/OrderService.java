package psp.pos_system.services;

import psp.pos_system.models.DTO.OrderProductsResponse;
import psp.pos_system.models.Order;

import java.math.BigInteger;
import java.util.List;
import java.util.UUID;

public interface OrderService {

    List<Order> getAll();

    Order createOrder(UUID employeeId);

    Order getOrderById(UUID orderId);

    void deleteOrderById(UUID id);

    List<OrderProductsResponse> getProductsByOrderId(UUID orderId);

    BigInteger calculateOrderPrice(UUID orderId);

//    Or updateOrder(UUID id);
}
