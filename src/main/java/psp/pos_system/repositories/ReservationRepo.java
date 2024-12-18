package psp.pos_system.repositories;

import jakarta.persistence.Entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import psp.pos_system.models.Reservation;

import java.util.List;
import java.util.UUID;

@Repository
public interface ReservationRepo extends JpaRepository<Reservation, UUID> {
    List<Reservation> findByBusinessId(UUID businessId);
}