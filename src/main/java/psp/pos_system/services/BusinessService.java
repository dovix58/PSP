package psp.pos_system.services;


import psp.pos_system.dtos.business.BusinessGetDTO;
import psp.pos_system.models.Business;

import java.util.List;
import java.util.UUID;

public interface BusinessService {
    Business createBusiness(Business business);
    List<Business> getAllBusinesses();
    Business updateBusiness(UUID id, Business business);
    BusinessGetDTO getBusinessWithInfo(UUID id, boolean includeInfo, boolean includeProducts);
    void deleteBusiness(UUID id);
}
