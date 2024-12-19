package psp.pos_system.controllers;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import psp.pos_system.dtos.business.BusinessCreateDTO;
import psp.pos_system.dtos.business.BusinessUpdateDTO;
import psp.pos_system.dtosMappers.business.BusinessCreateMapper;
import psp.pos_system.dtosMappers.business.BusinessUpdateMapper;
import psp.pos_system.models.Business;
import psp.pos_system.services.BusinessService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/businesses")
public class BusinessController {

    private final BusinessService businessService;
    private final BusinessCreateMapper businessCreateMapper;
    private final BusinessUpdateMapper businessUpdateMapper;

    public BusinessController(BusinessService businessService, BusinessCreateMapper businessCreateMapper, BusinessUpdateMapper businessUpdateMapper) {
        this.businessService = businessService;
        this.businessCreateMapper = businessCreateMapper;
        this.businessUpdateMapper = businessUpdateMapper;
    }

    @PostMapping
    public ResponseEntity<?> createBusiness(@RequestBody BusinessCreateDTO businessDTO) {
        Business business = businessCreateMapper.toEntity(businessDTO);
        return new ResponseEntity<>(businessService.createBusiness(business),HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<?> getAllBusinesses() {
        List<Business> businessList = businessService.getAllBusinesses();
        return new ResponseEntity<>(businessList, HttpStatus.OK);
    }

    //Dar reiktu igyvendint showEmployees, bet pagal ju data modeli nzn kaip tai padaryt, tai palieku kol kas...
    @GetMapping("/{id}")
    public ResponseEntity<?> getBusinessById(@PathVariable UUID id,
                                             @RequestParam(value="showInfo", defaultValue = "true") boolean showInfo,
                                             @RequestParam(value = "showProducts", required = false) Optional<Boolean> showProducts) {
        boolean includeProducts = showProducts.orElse(false);
        return new ResponseEntity<>( businessService.getBusinessWithInfo(id, showInfo, includeProducts),HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBusiness(@PathVariable UUID id, @RequestBody BusinessUpdateDTO businessDTO) {
        Business businessWithUpdates = businessUpdateMapper.toEntity(businessDTO);
        return new ResponseEntity<>(businessService.updateBusiness(id, businessWithUpdates),HttpStatus.OK);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBusiness(@PathVariable UUID id) {
        businessService.deleteBusiness(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
