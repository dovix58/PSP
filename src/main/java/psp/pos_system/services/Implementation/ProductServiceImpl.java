package psp.pos_system.services.Implementation;

import org.springframework.stereotype.Service;
import psp.pos_system.models.Product;
import psp.pos_system.repositories.ProductRepo;
import psp.pos_system.services.ProductService;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepo productRepo;
    public ProductServiceImpl(ProductRepo productRepo) {
        this.productRepo = productRepo;
    }
    @Override
    public Product addProduct(String name, int price, int quantity) {
        Product product = Product.builder()
                .name(name)
                .price(price)
                .quantity(quantity)
                .created(Timestamp.from(Instant.now()))
                .build();
        return productRepo.save(product);
    }

    @Override
    public List<Product> getAll() {
        return productRepo.findAll().stream().toList();
    }

    @Override
    public Optional<Product> getById(UUID id) {
        return productRepo.findById(id);
    }

    @Override
    public Optional<Product> update(UUID id, String name, int price, int quantity) {
        var productOptional = productRepo.findById(id);
        if (productOptional.isPresent()) {
            var product = productOptional.get();
            product.setName(name);
            product.setPrice(price);
            product.setQuantity(quantity);
            productRepo.save(product);
        }
        return productOptional;
    }

    @Override
    public Optional<Product> delete(UUID id) {
        Optional<Product> product = productRepo.findById(id);
        if (product.isPresent())
            productRepo.deleteById(id);
        return product;
    }
}
