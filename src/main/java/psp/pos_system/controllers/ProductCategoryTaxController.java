package psp.pos_system.controllers;
import psp.pos_system.services.ProductCategoryTaxService;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import psp.pos_system.models.ProductCategoryTax;
import psp.pos_system.models.Tax;

public class ProductCategoryTaxController {
    private final ProductCategoryTaxService productCategoryTaxService;

    public ProductCategoryTaxController(ProductCategoryTaxService productCategoryTaxService){
        this.productCategoryTaxService = productCategoryTaxService;
    }

    @GetMapping
    public ResponseEntity<List<Tax>> getTaxByCategoryId(@PathVariable UUID categoryId){
        var result = productCategoryTaxService.getByCategoryId(categoryId);
        return (result.isEmpty()) ? new ResponseEntity<>(HttpStatus.NOT_FOUND) : new ResponseEntity<>(result, HttpStatus.OK);

    }

}
