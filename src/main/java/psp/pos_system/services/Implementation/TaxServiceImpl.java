package psp.pos_system.services.Implementation;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import psp.pos_system.models.ProductCategoryTax;
import psp.pos_system.repositories.ProductCategoryRepo;
import psp.pos_system.repositories.ProductRepo;

import psp.pos_system.services.TaxService;
import psp.pos_system.repositories.TaxRepo;
import psp.pos_system.repositories.ProductCategoryTaxRepo;
import psp.pos_system.models.Tax;

public class TaxServiceImpl implements TaxService{

    private final TaxRepo taxRepo;


    public TaxServiceImpl(TaxRepo taxRepo) {
        this.taxRepo = taxRepo;
    }

    @Override
    public Tax createTax(String name, String Country, int taxRate){
        Tax tax = new Tax();
        tax.setName(name);
        tax.setCountry(Country);
        tax.setTaxRate(taxRate);

        taxRepo.save(tax);
        return tax;
    }
    
    @Override
    public List<Tax> getAll(){
        return taxRepo.findAll().stream().toList();
    }
    
    @Override
    public Optional<Tax> getById(UUID id){
        var tax = taxRepo.findById(id);
        return tax;
    }

    @Override
    public Optional<Tax> update(UUID id, String name, String country, int taxRate){
        var updatableTax = taxRepo.findById(id);
        if (updatableTax.isPresent()){
            var tax = new Tax();
            tax.setName(name);
            tax.setCountry(country);
            tax.setTaxRate(taxRate);
            tax.setUpdated(Timestamp.from(Instant.now()));
            taxRepo.save(tax);
        }
        return updatableTax;
    }

    @Override
    public Optional<Tax> delete(UUID id){
        var tax = taxRepo.findById(id);
        if (tax.isPresent()){
            taxRepo.deleteById(id);
        }
        return tax;
    }
}
