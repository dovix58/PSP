package psp.pos_system.dtos.business;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BusinessGetDTO {
    private String name;
    private String country;
    private String number;
    private String address;
    private String businessType;
    private List<ProductInfo> products;


    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProductInfo {
        private String name;
        private int price;
    }
}
