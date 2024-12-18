package psp.pos_system.dtosMappers.reservation;

import org.springframework.stereotype.Component;
import psp.pos_system.dtos.reservation.ReservationUpdateDTO;
import psp.pos_system.models.Reservation;

@Component
public class ReservationUpdateMapper {
    public Reservation toEntity(ReservationUpdateDTO dto) {
        Reservation reservation = new Reservation();
        reservation.setBusinessId(dto.getBusinessId());
        reservation.setUserId(dto.getUserId());
        reservation.setCustomer(dto.getCustomer());
        reservation.setNote(dto.getNote());
        reservation.setAppointmentTime(dto.getAppointmentTime());

        return reservation;
    }
}
