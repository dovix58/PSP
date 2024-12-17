package psp.pos_system.controllers.Reservation.Mappers;

import org.springframework.stereotype.Component;
import psp.pos_system.controllers.Reservation.DTOs.ReservationCreateDTO;
import psp.pos_system.models.Reservation;

import java.time.LocalDateTime;

@Component
public class ReservationCreateMapper {

    public Reservation toEntity(ReservationCreateDTO dto) {
        if(dto == null) return null;
        Reservation reservation = new Reservation();
        reservation.setBussinesId(dto.getBussinesId());
        reservation.setUserId(dto.getUserId());
        reservation.setCustomer(dto.getCustomer());
        reservation.setNote(dto.getNote());
        reservation.setCreatedAt(LocalDateTime.now());
        reservation.setUpdatedAt(LocalDateTime.now());
        reservation.setAppointmentTime(dto.getAppointmentTime());

        return reservation;
    }
}
