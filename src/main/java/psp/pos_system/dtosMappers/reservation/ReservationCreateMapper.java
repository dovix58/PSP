package psp.pos_system.dtosMappers.reservation;

import org.springframework.stereotype.Component;
import psp.pos_system.dtos.reservation.ReservationCreateDTO;
import psp.pos_system.models.Reservation;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Component
public class ReservationCreateMapper {

    public Reservation toEntity(ReservationCreateDTO dto) {
        if(dto == null) return null;
        Reservation reservation = new Reservation();
        reservation.setBusinessId(UUID.randomUUID());//assigning random uuid
        reservation.setUserId(UUID.randomUUID());//assigning random uuid
        reservation.setCustomer(dto.getCustomer());
        reservation.setNote(dto.getNote());
        reservation.setCreatedAt(LocalDateTime.now());
        reservation.setUpdatedAt(LocalDateTime.now());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy, HH:mm:ss");

        // Convert the string to LocalDateTime
        LocalDateTime localDateTime = LocalDateTime.parse(dto.getAppointmentTime(), formatter);
        reservation.setAppointmentTime(localDateTime);

        return reservation;
    }
}
