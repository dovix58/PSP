package psp.pos_system.services;

import org.aspectj.weaver.ast.Or;
import psp.pos_system.models.DTO.CreateOrderProduct;
import psp.pos_system.models.DTO.UpdateOrderProductRequest;
import psp.pos_system.models.OrderProduct;

import java.util.List;
import java.util.UUID;

public interface OrderProductService {
    List<OrderProduct> getAll();

    OrderProduct createOrderProduct(UUID orderId, CreateOrderProduct createOrderProduct);

    OrderProduct getOrderProductById(UUID productId, UUID orderId);

    OrderProduct updateOrderProductById(UUID productId, UUID orderId, UpdateOrderProductRequest updateOrderProductRequest);

    void deleteOrderProductById(UUID productId, UUID orderId);
}
