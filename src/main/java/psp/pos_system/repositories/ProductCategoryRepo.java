package psp.pos_system.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import psp.pos_system.models.ProductCategory;

import java.util.UUID;

@Repository
public interface ProductCategoryRepo extends JpaRepository<ProductCategory, UUID> {
}