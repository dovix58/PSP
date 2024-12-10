package psp.pos_system.services;

import psp.pos_system.models.Product;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductService {
    //Veliau prideti categoryId prie argumentu
    Product addProduct(String name, int price);
    List<Product> getAll();
    Optional<Product> getById(UUID id);
    Optional<Product> update(UUID id, String name, int price);
    Optional<Product> delete(UUID id);
}
