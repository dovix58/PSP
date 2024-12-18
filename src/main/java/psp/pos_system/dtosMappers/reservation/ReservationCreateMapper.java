package psp.pos_system.dtosMappers.reservation;

import org.springframework.stereotype.Component;
import psp.pos_system.dtos.reservation.ReservationCreateDTO;
import psp.pos_system.models.Reservation;

import java.time.LocalDateTime;

@Component
public class ReservationCreateMapper {

    public Reservation toEntity(ReservationCreateDTO dto) {
        if(dto == null) return null;
        Reservation reservation = new Reservation();
        reservation.setBusinessId(dto.getBusinessId());
        reservation.setUserId(dto.getUserId());
        reservation.setCustomer(dto.getCustomer());
        reservation.setNote(dto.getNote());
        reservation.setCreatedAt(LocalDateTime.now());
        reservation.setUpdatedAt(LocalDateTime.now());
        reservation.setAppointmentTime(dto.getAppointmentTime());

        return reservation;
    }
}
