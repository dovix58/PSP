package psp.pos_system.services.Implementation;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


import org.springframework.stereotype.Service;

import psp.pos_system.models.ProductCategory;
import psp.pos_system.services.ProductCategoryService;
import psp.pos_system.repositories.ProductCategoryRepo;

@Service
public class ProductCategoryImpl implements ProductCategoryService{

    private final ProductCategoryRepo productCategoryRepo;

    public ProductCategoryImpl(ProductCategoryRepo productCategoryRepo) {
        this.productCategoryRepo = productCategoryRepo;
    }
    
    public ProductCategory createProductCategory(String productType, String name, UUID businessId){
        ProductCategory category = new ProductCategory();
        category.setName(name);
        category.setProductType(productType);
        category.setBusinessId(businessId);

        productCategoryRepo.save(category);
        return category;
    }
    
    @Override
    public List<ProductCategory> getAll(){
        var list = productCategoryRepo.findAll().stream().toList();
        return list;
    }

    @Override
    public List<ProductCategory> getByBusinessId(UUID businessId){
        var list = productCategoryRepo.findById(businessId).stream().toList();
        return list;
    }

    @Override
    public Optional<ProductCategory> getById(UUID id){
        var category = productCategoryRepo.findById(id);

        return category;
    }

    @Override
    public Optional<ProductCategory> update(UUID id, String productType, String name, UUID businessId){

        var updatableCategory = productCategoryRepo.findById(id);

        if (updatableCategory.isPresent()){
            var category = updatableCategory.get();
            category.setProductType(productType);
            category.setName(name);
            category.setBusinessId(businessId);
            productCategoryRepo.save(category);
        }
        return updatableCategory;

    }

    @Override
    public Optional<ProductCategory> delete(UUID id){
        var category = productCategoryRepo.findById(id);
        if (category.isPresent()){
            productCategoryRepo.deleteById(id);
        }
        return category;
    }

}
