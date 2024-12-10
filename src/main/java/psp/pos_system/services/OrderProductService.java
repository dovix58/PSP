package psp.pos_system.services;

import psp.pos_system.models.DTO.CreateOrderProduct;
import psp.pos_system.models.OrderProduct;

import java.util.List;
import java.util.UUID;

public interface OrderProductService {
    List<OrderProduct> getAll();

    OrderProduct createOrderProduct(UUID orderId, CreateOrderProduct createOrderProduct);
}
