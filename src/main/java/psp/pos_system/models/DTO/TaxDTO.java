package psp.pos_system.models.DTO;

import java.security.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaxDTO {
    String name;
    String country;
    int taxRate;
    Timestamp created;
    Timestamp updated;
}
