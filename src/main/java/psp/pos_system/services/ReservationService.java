package psp.pos_system.services;

import org.springframework.stereotype.Service;
import psp.pos_system.models.Reservation;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ReservationService {

    Reservation createReservation (Reservation reservation);

    List<Reservation> getAllReservations(Optional<UUID> businessId);

    Reservation getReservationById(UUID id);

    void deleteReservation(UUID id);

}