package psp.pos_system.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import psp.pos_system.models.Keys.ProductCategoryTaxKey;

import java.security.Timestamp;
import java.time.LocalDate;
import java.util.UUID;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Table(name = "productCategoryTax", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"tax_id", "category_id"})
})

public class ProductCategoryTax {

    @EmbeddedId
    private ProductCategoryTaxKey id;

    @ManyToOne
    @MapsId("categoryId")
    @JoinColumn(name = "category_id", insertable = false, updatable = false)
    private ProductCategory category;

    @ManyToOne
    @MapsId("taxId")
    @JoinColumn(name = "tax_id", insertable = false, updatable = false)
    private Tax tax;



}
