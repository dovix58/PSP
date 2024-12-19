package psp.pos_system.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import psp.pos_system.models.DTO.CreateOrderRequest;
import psp.pos_system.models.DTO.OrderProductsResponse;
import psp.pos_system.models.Order;
import psp.pos_system.services.OrderService;

import java.math.BigInteger;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {
    private final OrderService orderService;


    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping()
    public List<Order> getAllOrders(){
        return orderService.getAll();
    }

    @CrossOrigin
    @PostMapping()
    public ResponseEntity<Order> createOrder(@RequestBody CreateOrderRequest request){
        return new ResponseEntity<>(orderService.createOrder(request.getEmployeeId()), HttpStatus.CREATED);
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<Order> retrieveOrder(@PathVariable UUID id){
        return new ResponseEntity<>(orderService.getOrderById(id), HttpStatus.OK);
    }

    @CrossOrigin
    @PutMapping("/{id}/close")
    public ResponseEntity<Order> closeOrder(@PathVariable UUID id){
        return new ResponseEntity<>(orderService.closeOrder(id), HttpStatus.OK);
    }
    @PutMapping("/{id}/refund")
    public ResponseEntity<Order> refundOrder(@PathVariable UUID id){
        return new ResponseEntity<>(orderService.refundOrder(id), HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity deleteOrder(@PathVariable UUID id){
        orderService.deleteOrderById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{orderId}/products")
    public ResponseEntity<List<OrderProductsResponse>> getProductsByOrder(@PathVariable UUID orderId) {
        List<OrderProductsResponse> products = orderService.getProductsByOrderId(orderId);
        return ResponseEntity.ok(products);
    }
    @GetMapping("/{orderId}/totalPrice")
    public ResponseEntity<BigInteger> getOrderPrice(@PathVariable UUID orderId){
        return new ResponseEntity<>(orderService.calculateOrderPrice(orderId), HttpStatus.OK);
    }
}
