package psp.pos_system.dtosMappers.reservation;

import org.springframework.stereotype.Component;
import psp.pos_system.dtos.reservation.ReservationUpdateDTO;
import psp.pos_system.models.Reservation;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class ReservationUpdateMapper {
    public Reservation toEntity(ReservationUpdateDTO dto) {
        Reservation reservation = new Reservation();
        reservation.setBusinessId(dto.getBusinessId());
        reservation.setUserId(dto.getUserId());
        reservation.setCustomer(dto.getCustomer());
        reservation.setNote(dto.getNote());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy, HH:mm:ss");

        // Convert the string to LocalDateTime
        LocalDateTime localDateTime = LocalDateTime.parse(dto.getAppointmentTime(), formatter);

        reservation.setAppointmentTime(localDateTime);

        return reservation;
    }
}
