package psp.pos_system.services.Implementation;

import org.springframework.stereotype.Service;
import psp.pos_system.dtos.reservation.ReservationResponse;
import psp.pos_system.models.Reservation;
import psp.pos_system.repositories.ReservationRepo;
import psp.pos_system.services.ReservationService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepo reservationRepo;

    public ReservationServiceImpl(ReservationRepo reservationRepo) {
        this.reservationRepo = reservationRepo;
    }

    @Override
    public ReservationResponse createReservation(Reservation reservation) {
        LocalDateTime requestedTime = reservation.getAppointmentTime();
        Optional<Reservation> existingReservation = reservationRepo.findByAppointmentTime(requestedTime);
        if (existingReservation.isPresent()) {
            return new ReservationResponse(false, "This time slot is already booked, check reservation list and try again...");
        }
        reservationRepo.save(reservation);

        return new ReservationResponse(true, "Reservation successfully created.");
    }

    @Override
    public List<Reservation> getAllReservations(Optional<UUID> businessId){
        if (businessId.isPresent()) {
            List<Reservation> reservations = reservationRepo.findByBusinessId(businessId.get());
            return reservations;
        } else {
            return reservationRepo.findAll();
        }
    }

    @Override
    public void fulfillReservation (UUID id) {
        Optional<Reservation> reservation = reservationRepo.findById(id);
        if (reservation.isPresent()) {
           Reservation res = reservation.get();
           res.setFulfilled(true);
           reservationRepo.save(res);
        }
    }

    @Override
    public Reservation updateReservation(UUID reservationId, Reservation reservation) {
        Reservation reservationToUpdate = reservationRepo.findById(reservationId).get();
        // Update only the fields that are not null in the DTO
        if (reservation.getBusinessId() != null) {
            reservationToUpdate.setBusinessId(reservation.getBusinessId());
        }
        if (reservation.getUserId() != null) {
            reservationToUpdate.setUserId(reservation.getUserId());
        }
        if (reservation.getAppointmentTime() != null) {
            reservationToUpdate.setAppointmentTime(reservation.getAppointmentTime());
        }
        if (reservation.getCustomer() != null) {
            reservationToUpdate.setCustomer(reservation.getCustomer());
        }
        if (reservation.getNote() != null) {
            reservationToUpdate.setNote(reservation.getNote());
        }

        return reservationRepo.save(reservationToUpdate);
    }

    @Override
    public Reservation getReservationById(UUID id) {
        return reservationRepo.findById(id).orElse(null);
    }

    @Override
    public void deleteReservation(UUID id) {
        // Check if the reservation exists
        Reservation reservation = reservationRepo.findById(id).orElse(null);
        // Delete the reservation
        reservationRepo.delete(reservation);
    }


}
