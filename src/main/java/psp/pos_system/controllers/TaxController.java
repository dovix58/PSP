package psp.pos_system.controllers;

import java.util.List;
import java.util.UUID;

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

import psp.pos_system.services.TaxService;
import psp.pos_system.models.Tax;
import psp.pos_system.models.DTO.TaxDTO;

@RestController
@RequestMapping("/api/v1/taxes")
public class TaxController {
    private final TaxService taxService;

    public TaxController(TaxService taxService) {
        this.taxService = taxService;
    }


    @PostMapping(consumes = "application/json")
    public ResponseEntity<Tax> createTax(@RequestBody TaxDTO dto){
        var result = taxService.createTax(dto.getName(), dto.getCountry(), dto.getTaxRate());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Tax>> getTaxes(){
        var result = taxService.getAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping ("/{id}")
    public ResponseEntity<Tax> getTaxById(@PathVariable UUID id){
        return taxService.getById(id)
        .map(result -> new ResponseEntity<>(result, HttpStatus.OK))
        .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @PutMapping ("/{id}")
    public ResponseEntity<Tax> updateTax(@PathVariable UUID id, @RequestBody TaxDTO dto){
        return taxService.update(id, dto.getName(), dto.getCountry(), dto.getTaxRate())
        .map(result -> new ResponseEntity<>(result, HttpStatus.OK))
        .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Tax> deleteTax(@PathVariable UUID id){
        return taxService.delete(id)
        .map(result -> new ResponseEntity<>(result, HttpStatus.OK))
        .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
