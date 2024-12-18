package psp.pos_system.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name="reservations")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column (nullable = false)
    private UUID businessId;

    @Column (nullable = false)
    private UUID userId;

    @Column (nullable = false)
    private String customer; // Customer's name

    @Column (nullable = false)
    private String note; // Reservation note

    @Column (nullable = false, updatable = false)
    private LocalDateTime createdAt; //Creation time, not updatable

    @Column (nullable = false)
    private LocalDateTime updatedAt;

    @Column (nullable = false)
    private LocalDateTime appointmentTime;
}
