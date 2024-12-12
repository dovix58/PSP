package psp.pos_system.controllers;

import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import psp.pos_system.models.DTO.CreateOrderProduct;
import psp.pos_system.models.DTO.UpdateOrderProductRequest;
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
    @GetMapping("/{productId}")
    public ResponseEntity<OrderProduct> getOrerProductById(@PathVariable UUID productId, @PathVariable UUID orderId){
        return new ResponseEntity<>(orderProductService.getOrderProductById(productId, orderId), HttpStatus.OK);
    }
    @PutMapping("/{productId}")
    public ResponseEntity<OrderProduct> updateOrderProduct(@PathVariable UUID productId, @PathVariable UUID orderId, @RequestBody UpdateOrderProductRequest updateOrderProductRequest){
        return new ResponseEntity<>(orderProductService.updateOrderProductById(productId, orderId, updateOrderProductRequest), HttpStatus.OK);
    }
    @DeleteMapping("/{productId}")
    public ResponseEntity deleteOrderProduct(@PathVariable UUID productId, @PathVariable UUID orderId){
        orderProductService.deleteOrderProductById(productId, orderId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
