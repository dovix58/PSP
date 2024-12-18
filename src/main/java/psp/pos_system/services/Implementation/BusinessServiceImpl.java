package psp.pos_system.services.Implementation;

import org.springframework.stereotype.Service;
import psp.pos_system.dtos.business.BusinessGetDTO;
import psp.pos_system.models.Business;
import psp.pos_system.repositories.BusinessRepo;
import psp.pos_system.services.BusinessService;

import java.util.*;

@Service
public class BusinessServiceImpl implements BusinessService {

    private final BusinessRepo businessRepo;

    public BusinessServiceImpl(BusinessRepo businessRepo) {
        this.businessRepo = businessRepo;
    }

    @Override
    public Business createBusiness(Business business) {
        return businessRepo.save(business);
    }

    @Override
    public List<Business> getAllBusinesses () {
        return businessRepo.findAll().stream().toList();
    }

    @Override
    public Business updateBusiness(UUID id, Business business) {
        Business businessToUpdate = businessRepo.findById(id).get();

        if(business.getName() != null) {
            businessToUpdate.setName(business.getName());
        }
        if(business.getAddress() != null) {
            businessToUpdate.setAddress(business.getAddress());
        }
        if(business.getCountry() != null) {
            businessToUpdate.setCountry(business.getCountry());
        }
        if(business.getNumber() != null) {
            businessToUpdate.setNumber(business.getNumber());
        }
        if(business.getBusinessType() != null) {
            businessToUpdate.setBusinessType(business.getBusinessType());
        }

        return businessRepo.save(businessToUpdate);
    }

    @Override
    public void deleteBusiness(UUID id) {
        businessRepo.deleteById(id);
    }

    @Override
    public BusinessGetDTO getBusinessWithInfo(UUID id,boolean includeInfo, boolean includeProducts){
        Business business = businessRepo.findById(id).get();
        BusinessGetDTO businessWithInfo = new BusinessGetDTO();
        if(includeInfo) {
            businessWithInfo.setName(business.getName());
            businessWithInfo.setAddress(business.getAddress());
            businessWithInfo.setCountry(business.getCountry());
            businessWithInfo.setNumber(business.getNumber());
            businessWithInfo.setBusinessType(String.valueOf(business.getBusinessType()));
        }
        //Kadangi dar neturim kategoriju, tai grazinam dummy produktu lista
        if(includeProducts) {
            List<BusinessGetDTO.ProductInfo> productInfoList = new ArrayList<>();
            productInfoList.add(new BusinessGetDTO.ProductInfo("Pienas", 159));

            businessWithInfo.setProducts(productInfoList);
        }

        return businessWithInfo;
    }
}
