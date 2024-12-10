package psp.pos_system.services;

import psp.pos_system.models.Product;

import java.util.List;
import java.util.UUID;

public interface ProductService {
    List<Product> getAll();

    Product createProduct(String name);
}
