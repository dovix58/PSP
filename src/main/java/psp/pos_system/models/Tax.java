package psp.pos_system.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;


@Entity
@Getter
@Setter
@Table(name = "taxes")
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Tax {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String country;

    @Column(nullable = false)
    private int taxRate;

    @Column(nullable = false)
    private Timestamp created;

    @Column
    private Timestamp updated;

    @JsonBackReference
    @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "tax")
    Set<ProductCategoryTax> categories = new HashSet<>();


}
