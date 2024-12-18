package psp.pos_system.services;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import psp.pos_system.models.Tax;

public interface TaxService {

    Tax createTax(String name, String Country, int taxRate);
    List<Tax> getAll();
    Optional<Tax> getById(UUID id);
    Optional<Tax> update(UUID id, String name, String country, int taxRate);
    Optional<Tax> delete(UUID id);
    

}
