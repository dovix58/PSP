package psp.pos_system.controllers;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import psp.pos_system.dtos.reservation.ReservationCreateDTO;
import psp.pos_system.dtos.reservation.ReservationResponse;
import psp.pos_system.dtos.reservation.ReservationUpdateDTO;
import psp.pos_system.dtosMappers.reservation.ReservationCreateMapper;
import psp.pos_system.dtosMappers.reservation.ReservationUpdateMapper;
import psp.pos_system.models.Reservation;
import psp.pos_system.services.ReservationService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/reservations")
public class ReservationController {

    private final ReservationCreateMapper reservationCreateMapper;
    private final ReservationUpdateMapper reservationUpdateMapper;
    private final ReservationService reservationService;

    public ReservationController(ReservationCreateMapper reservationCreateMapper, ReservationUpdateMapper reservationUpdateMapper ,ReservationService reservationService) {
        this.reservationCreateMapper = reservationCreateMapper;
        this.reservationUpdateMapper = reservationUpdateMapper;
        this.reservationService = reservationService;
    }


    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody ReservationCreateDTO reservationCreateDTO) {
        Reservation reservation = reservationCreateMapper.toEntity(reservationCreateDTO);
        ReservationResponse response = reservationService.createReservation(reservation);
        if (response.isSuccess()) {
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<?> getReservations(@RequestParam Optional<UUID> businessId){
        return new ResponseEntity<>(reservationService.getAllReservations(businessId), HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getReservationsById(@PathVariable UUID id){
        return new ResponseEntity<>(reservationService.getReservationById(id), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateReservation(@PathVariable UUID id, @RequestBody ReservationUpdateDTO reservationUpdateDTO){
        Reservation reservationWithUpdates = reservationUpdateMapper.toEntity(reservationUpdateDTO);
        Reservation updatedReservation = reservationService.updateReservation(id, reservationWithUpdates);
        return new ResponseEntity<>(updatedReservation, HttpStatus.OK);
    }

    @PutMapping({"/fulfill/{id}"})
    public ResponseEntity<?> fulfillReservation(@PathVariable UUID id){
        reservationService.fulfillReservation(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReservation(@PathVariable UUID id) {
        reservationService.deleteReservation(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
