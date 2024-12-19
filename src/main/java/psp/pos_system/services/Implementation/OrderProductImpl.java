package psp.pos_system.services.Implementation;

import org.springframework.stereotype.Service;
import psp.pos_system.models.DTO.CreateOrderProduct;
import psp.pos_system.models.DTO.UpdateOrderProductRequest;
import psp.pos_system.models.Keys.OrderProductKey;
import psp.pos_system.models.OrderProduct;
import psp.pos_system.repositories.OrderProductRepo;
import psp.pos_system.repositories.OrderRepo;
import psp.pos_system.repositories.ProductRepo;
import psp.pos_system.services.OrderProductService;

import java.math.BigInteger;
import java.util.List;
import java.util.UUID;

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
        var order = orderRepo.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        var product =  productRepo.findById(createOrderProduct.getProductId()).orElseThrow(() -> new RuntimeException("Product not found"));

        if (product.getQuantity() - createOrderProduct.getQuantity() < 0)
            throw new IllegalArgumentException("Order product quantity cannot be bigger than actual product quantity");

        product.setQuantity(product.getQuantity() - createOrderProduct.getQuantity());
        productRepo.save(product);

        OrderProduct orderProduct = new OrderProduct();
        orderProduct.setId(key);
        orderProduct.setOrder(order);
        orderProduct.setProduct(product);
        orderProduct.setQuantity(createOrderProduct.getQuantity());

        BigInteger bigPrice = BigInteger.valueOf(product.getPrice());
        BigInteger bigQuantity = BigInteger.valueOf(createOrderProduct.getQuantity());

        orderProduct.setPrice(bigPrice.multiply(bigQuantity));

        order.getProducts().add(orderProduct);
        product.getOrders().add(orderProduct);
        return orderProductRepo.save(orderProduct);

    }

    @Override
    public OrderProduct getOrderProductById(UUID productId, UUID orderId) {
        OrderProductKey key = new OrderProductKey(productId, orderId);

        return orderProductRepo.findById(key)
                .orElseThrow(() -> new IllegalArgumentException("OrderProduct not found for orderId: " + orderId + ", productId: " + productId));
    }

    @Override
    public OrderProduct updateOrderProductById(UUID productId, UUID orderId, UpdateOrderProductRequest updateOrderProductRequest) {
        OrderProductKey key = new OrderProductKey(productId, orderId);

        OrderProduct orderProduct =  orderProductRepo.findById(key)
                .orElseThrow(() -> new IllegalArgumentException("OrderProduct not found for orderId: " + orderId + ", productId: " + productId));
        orderProduct.setQuantity(updateOrderProductRequest.getQuantity());

        var quantityDiff = orderProduct.getQuantity() - updateOrderProductRequest.getQuantity();

        var product =  productRepo.findById(orderProduct.getProduct().getId()).orElseThrow(() -> new RuntimeException("Product not found"));
        if (product.getQuantity() + quantityDiff < 0)
            throw new IllegalArgumentException("Order product quantity cannot be bigger than actual product quantity");
        product.setQuantity(product.getQuantity() + quantityDiff);
        productRepo.save(product);

        orderProduct.setProduct(product);
        BigInteger bigPrice = BigInteger.valueOf(orderProduct.getProduct().getPrice());
        BigInteger bigQuantity = BigInteger.valueOf(updateOrderProductRequest.getQuantity());

        orderProduct.setPrice(bigPrice.multiply(bigQuantity));
        return orderProductRepo.save(orderProduct);
    }

    @Override
    public void deleteOrderProductById(UUID productId, UUID orderId) {
        OrderProductKey key = new OrderProductKey(productId, orderId);
        OrderProduct orderProduct =  orderProductRepo.findById(key)
                .orElseThrow(() -> new IllegalArgumentException("OrderProduct not found for orderId: " + orderId + ", productId: " + productId));

        var product = productRepo.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
        product.setQuantity(product.getQuantity() + orderProduct.getQuantity());
        productRepo.save(product);
        orderProduct.setProduct(product);

        orderProductRepo.deleteById(key);
    }
}
