package psp.pos_system.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Data
@Table(name = "products")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

// Nekreipti demesio, cia kai darysim produktu kategorijas
//    @ManyToOne
//    @JoinColumn(name = "category_id")
//    private ProductCategory categoryId;

    @Column(nullable = false)
    private String name;

    //Kaina saugoma centais
    @Column(nullable = false)
    private int price;

    // Laikai saugomi UTC laiko zona
    @Column(nullable = false)
    private Timestamp created;

    private Timestamp updated;
}
