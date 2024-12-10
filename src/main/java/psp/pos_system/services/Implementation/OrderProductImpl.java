package psp.pos_system.services.Implementation;

import org.springframework.stereotype.Service;
import psp.pos_system.models.DTO.CreateOrderProduct;
import psp.pos_system.models.Keys.OrderProductKey;
import psp.pos_system.models.Order;
import psp.pos_system.models.OrderProduct;
import psp.pos_system.models.Product;
import psp.pos_system.repositories.OrderProductRepo;
import psp.pos_system.repositories.OrderRepo;
import psp.pos_system.repositories.ProductRepo;
import psp.pos_system.services.OrderProductService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderProductImpl implements OrderProductService {

    private final OrderProductRepo orderProductRepo;
    private final OrderRepo orderRepo;
    private final ProductRepo productRepo;

    public OrderProductImpl(OrderProductRepo orderProductRepo, OrderRepo orderRepo, ProductRepo productRepo) {
        this.orderProductRepo = orderProductRepo;
        this.orderRepo = orderRepo;
        this.productRepo = productRepo;
    }

    @Override
    public List<OrderProduct> getAll() {
        return orderProductRepo.findAll().stream().toList();
    }

    @Override
    public OrderProduct createOrderProduct(UUID orderId, CreateOrderProduct createOrderProduct) {

        OrderProductKey key = new OrderProductKey(createOrderProduct.getProductId(), orderId);
        if (orderProductRepo.existsById(key)) {
            throw new IllegalArgumentException("This product is already associated with the given order");
        }
        Optional<Order> order = orderRepo.findById(orderId);
        Optional<Product> product =  productRepo.findById(createOrderProduct.getProductId());


        OrderProduct orderProduct = new OrderProduct();
        orderProduct.setId(key);
        orderProduct.setOrder(order.orElseThrow());
        orderProduct.setProduct(product.orElseThrow());
        orderProduct.setQuantity(createOrderProduct.getQuantity());
        return orderProductRepo.save(orderProduct);

    }


}
