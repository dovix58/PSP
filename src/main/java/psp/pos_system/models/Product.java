package psp.pos_system.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "products")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;


    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id", nullable = false)
    private ProductCategory category;

    @Column(nullable = false)
    private String name;

    //Kaina saugoma centais
    @Column(nullable = false)
    private int price;

    // Laikai saugomi UTC laiko zona
    @Column(nullable = false)
    private Timestamp created;

    private Timestamp updated;

    @Column(nullable = false)
    private int quantity;

    @JsonBackReference
    @OneToMany(mappedBy = "product", orphanRemoval = true)
    Set<OrderProduct> orders = new HashSet<>();

    
}
