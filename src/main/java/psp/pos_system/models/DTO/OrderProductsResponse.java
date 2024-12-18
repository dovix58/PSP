package psp.pos_system.models.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderProductsResponse {
    UUID id;
    String name;
    int quantity;
    BigInteger price;
}
