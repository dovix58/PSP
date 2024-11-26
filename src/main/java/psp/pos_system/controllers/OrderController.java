package psp.pos_system.controllers;

import org.aspectj.weaver.ast.Or;
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
import psp.pos_system.models.Order;
import psp.pos_system.services.OrderService;

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
    @PostMapping()
    public ResponseEntity<Order> createOrder(@RequestBody UUID userId){
        return new ResponseEntity<>(orderService.createOrder(userId), HttpStatus.CREATED);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Order> retrieveOrder(@PathVariable UUID id){
        return new ResponseEntity<>(orderService.getOrderById(id), HttpStatus.OK);
    }
//    @PutMapping("/{id}")
//    public ResponseEntity<Order> updateOrder(@PathVariable UUID id){
//        return new ResponseEntity<>(orderService.updateOrder(id), HttpStatus.OK);
//
//    }
    @DeleteMapping("/{id}")
    public ResponseEntity deleteOrder(@PathVariable UUID id){
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
