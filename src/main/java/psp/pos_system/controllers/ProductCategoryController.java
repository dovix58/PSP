package psp.pos_system.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import psp.pos_system.models.ProductCategory;
import psp.pos_system.services.ProductCategoryService;
import psp.pos_system.models.DTO.ProductCategoryDTO;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/categories")
public class ProductCategoryController {

    private final ProductCategoryService productCategoryService;

    public ProductCategoryController(ProductCategoryService productCategoryService) {
        this.productCategoryService = productCategoryService;
    }

    @PostMapping
    public ResponseEntity <ProductCategory> createProductCategory(@RequestBody ProductCategoryDTO dto){
        return new ResponseEntity<>(productCategoryService.createProductCategory(dto.getProductType(), dto.getName(), dto.getBusinessId()), HttpStatus.CREATED);
    }

    @GetMapping("/{businessId}")
    public ResponseEntity<List<ProductCategory>> getProductCategoryByBusinessId(UUID businessId){
        var result = productCategoryService.getByBusinessId(businessId);
        return (result.isEmpty()) ? new ResponseEntity<>(HttpStatus.NOT_FOUND) : new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<ProductCategory>> getAllProductCategories(){
        var result = productCategoryService.getAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductCategory> getProductCategoryById(@PathVariable UUID categoryId){
        return productCategoryService.getById(categoryId)
        .map(result -> new ResponseEntity<>(result, HttpStatus.OK))
        .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @PutMapping("/{id}")
    public ResponseEntity<ProductCategory> updateProductCategory(@PathVariable UUID id, @RequestBody ProductCategoryDTO dto){
        return productCategoryService.update(id, dto.getProductType(), dto.getName(), dto.getBusinessId())
        .map(result -> new ResponseEntity<>(result,HttpStatus.OK))
        .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ProductCategory> deleteProductCategory(@PathVariable UUID id){
        return productCategoryService.delete(id)
        .map(result -> new ResponseEntity<>(result, HttpStatus.OK))
        .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    
    
}
