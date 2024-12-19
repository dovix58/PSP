package psp.pos_system.dtosMappers.business;

import org.springframework.stereotype.Component;
import psp.pos_system.dtos.business.BusinessUpdateDTO;
import psp.pos_system.models.Business;

@Component
public class BusinessUpdateMapper {
    public Business toEntity(BusinessUpdateDTO businessUpdateDTO) {
        Business business = new Business();
        business.setName(businessUpdateDTO.getName());
        business.setCountry(businessUpdateDTO.getCountry());
        business.setAddress(businessUpdateDTO.getAddress());
        business.setNumber(businessUpdateDTO.getNumber());
        business.setBusinessType(businessUpdateDTO.getBussinesType());

        return business;
    }

}
