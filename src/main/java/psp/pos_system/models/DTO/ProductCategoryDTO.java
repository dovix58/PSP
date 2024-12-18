package psp.pos_system.models.DTO;

import java.security.Timestamp;
import java.util.UUID;

public class ProductCategoryDTO {
    String productType;
    String name;
    UUID businessId;
    Timestamp created;

    public String getProductType() {
        return productType;
    }
    public String getName() {
        return name;
    }
    public UUID getBusinessId() {
        return businessId;
    }
    public Timestamp getCreated() {
        return created;
    }
    
}
