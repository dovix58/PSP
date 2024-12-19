package psp.pos_system.services;

import psp.pos_system.models.ProductCategoryTax;
import psp.pos_system.models.Tax;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductCategoryTaxService{

    List<Tax> getByCategoryId(UUID categoryId);
}