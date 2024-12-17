package psp.pos_system.controllers.Reservation;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import psp.pos_system.dtos.reservation.ReservationCreateDTO;
import psp.pos_system.dtosMappers.reservation.ReservationCreateMapper;
import psp.pos_system.models.Reservation;

@RestController
@RequestMapping("/api/v1/reservations")
public class ReservationController {

    private final ReservationCreateMapper reservationCreateMapper;

    public ReservationController(ReservationCreateMapper reservationCreateMapper) {
        this.reservationCreateMapper = reservationCreateMapper;
    }


    @PostMapping
    public ResponseEntity<Reservation> createReservation(@RequestBody ReservationCreateDTO reservationCreateDTO) {
        Reservation reservation = reservationCreateMapper.toEntity(reservationCreateDTO);
        return ResponseEntity.status(201).body(reservation);
    }

    @GetMapping String getReservations(){
        return "Hello reservations!";
    }
}
