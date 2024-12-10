package psp.pos_system.controllers;

import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import psp.pos_system.models.DTO.CreateOrderProduct;
import psp.pos_system.models.Order;
import psp.pos_system.models.OrderProduct;
import psp.pos_system.services.OrderProductService;

import java.util.UUID;

@RestController
@RequestMapping("api/v1/orders/{orderId}/products")
public class OrderProductController {
    private final OrderProductService orderProductService;

    public OrderProductController(OrderProductService orderProductService) {
        this.orderProductService = orderProductService;
    }

    @PostMapping()
    public ResponseEntity<OrderProduct> createOrderProduct(@PathVariable UUID orderId, @RequestBody CreateOrderProduct createOrderProduct) {
        return new ResponseEntity<>(orderProductService.createOrderProduct(orderId, createOrderProduct), HttpStatus.CREATED);
    }
}
