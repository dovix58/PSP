package psp.pos_system.services;

import org.springframework.stereotype.Service;
import psp.pos_system.dtos.reservation.ReservationResponse;
import psp.pos_system.models.Reservation;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ReservationService {

    ReservationResponse createReservation (Reservation reservation);

    List<Reservation> getAllReservations(Optional<UUID> businessId);

    Reservation getReservationById(UUID id);

    Reservation updateReservation(UUID id, Reservation reservation);

    void deleteReservation(UUID id);

    void fulfillReservation(UUID id);

}
