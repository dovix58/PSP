package psp.pos_system.services;

import psp.pos_system.models.Order;

import java.util.List;
import java.util.UUID;

public interface OrderService {

    List<Order> getAll();

    Order createOrder(UUID userId);
}
