package psp.pos_system.models.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderProductsResponse {
    String name;
    int quantity;
    BigInteger price;
}
