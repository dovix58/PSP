package psp.pos_system.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import psp.pos_system.models.Keys.ProductCategoryTaxKey;
import psp.pos_system.models.ProductCategoryTax;

import java.util.UUID;

@Repository
public interface ProductCategoryTaxRepo extends JpaRepository<ProductCategoryTax, ProductCategoryTaxKey> {

    boolean existsById(ProductCategoryTaxKey id);
}