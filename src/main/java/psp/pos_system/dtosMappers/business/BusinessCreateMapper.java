package psp.pos_system.dtosMappers.business;

import org.springframework.stereotype.Component;
import psp.pos_system.dtos.business.BusinessCreateDTO;
import psp.pos_system.models.Business;

@Component
public class BusinessCreateMapper {

    public Business toEntity(BusinessCreateDTO dto) {
        if(dto == null) return null;
        Business business = new Business();
        business.setName(dto.getName());
        business.setCountry(dto.getCountry());
        business.setNumber((dto.getNumber()));
        business.setAddress(dto.getAddress());
        business.setBusinessType(dto.getBusinessType());
        return business;
    }
}
