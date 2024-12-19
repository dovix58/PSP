package psp.pos_system.services.Implementation;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import psp.pos_system.models.ProductCategoryTax;
import psp.pos_system.repositories.ProductCategoryTaxRepo;
import psp.pos_system.repositories.TaxRepo;
import psp.pos_system.services.ProductCategoryTaxService;
import psp.pos_system.models.Tax;

@Service
public class ProductCategoryTaxImpl implements ProductCategoryTaxService{
    private final ProductCategoryTaxRepo productCategoryTaxRepo;

    private final TaxRepo taxRepo;

    public ProductCategoryTaxImpl(ProductCategoryTaxRepo productCategoryTaxRepo, TaxRepo taxRepo) {
        this.productCategoryTaxRepo = productCategoryTaxRepo;
        this.taxRepo = taxRepo;
    }
    

    @Override
    public List<Tax> getByCategoryId(UUID categoryId){

        List<ProductCategoryTax> categoryTaxes = productCategoryTaxRepo.findAll();

        var filtered =  categoryTaxes.stream()
            .filter(productCategoryTax -> productCategoryTax.getCategory().getId().equals(categoryId))
            .collect(Collectors.toList());
        
        List<UUID> taxIds = filtered.stream()
            .map(productCategoryTax -> productCategoryTax.getTax().getId())
            .collect(Collectors.toList());                                 
        
        return taxRepo.findAllById(taxIds);


    }

    
}
