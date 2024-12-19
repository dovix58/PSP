package psp.pos_system.models.Keys;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class ProductCategoryTaxKey implements Serializable {
    @Column(name = "tax_id")
    UUID taxId;

    @Column(name = "category_id")
    UUID categoryId;
}
