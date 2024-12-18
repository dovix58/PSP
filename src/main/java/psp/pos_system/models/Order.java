package psp.pos_system.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import psp.pos_system.models.enums.OrderStatus;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID employeeId;

    @Column(nullable = false)
    private Timestamp created;

    @Column(nullable = true)
    private Timestamp updated;

    @Column(nullable = true)
    private Timestamp completed;

    @OneToMany(mappedBy = "order", orphanRemoval = true)
    @JsonBackReference
    @EqualsAndHashCode.Exclude
    Set<OrderProduct> products = new HashSet<>();

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;
}
