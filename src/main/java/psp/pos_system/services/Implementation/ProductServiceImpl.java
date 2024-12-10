package psp.pos_system.services.Implementation;

import org.springframework.stereotype.Service;
import psp.pos_system.models.Product;
import psp.pos_system.repositories.ProductRepo;
import psp.pos_system.services.ProductService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepo productRepo;

    public ProductServiceImpl(ProductRepo productRepo) {
        this.productRepo = productRepo;
    }

    @Override
    public List<Product> getAll() {
        return productRepo.findAll().stream().toList();
    }

    @Override
    public Product createProduct(String name) {
        Product product = new Product();
        product.setName(name);
        return productRepo.save(product);
    }
}
