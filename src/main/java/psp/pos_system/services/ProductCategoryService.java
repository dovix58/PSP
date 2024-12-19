package psp.pos_system.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import psp.pos_system.models.ProductCategory;

public interface ProductCategoryService {

    ProductCategory createProductCategory(String productType, String name, UUID businessId);
    List<ProductCategory> getAll();
    List<ProductCategory> getByBusinessId(UUID businessId);
    Optional<ProductCategory> getById(UUID id);
    Optional<ProductCategory> update(UUID id, String productType, String name, UUID businessId);
    Optional<ProductCategory> delete(UUID id);
    
}
