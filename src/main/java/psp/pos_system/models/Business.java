package psp.pos_system.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import psp.pos_system.models.enums.ServiceType;

import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name="businesses")
@NoArgsConstructor
@AllArgsConstructor
public class Business {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String country;

    @Column(nullable = false)
    private String number;

    @Column(nullable = false)
    private String address;

    @Enumerated(EnumType.STRING)
    private ServiceType businessType;
}
