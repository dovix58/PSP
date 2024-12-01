package psp.pos_system.controllers.Reservation.DTOs;

import java.time.LocalDateTime;
import java.util.UUID;

public class ReservationCreateDTO {
    private UUID bussinesId;
    private UUID userId;
    private String customer; // Customer's name
    private String note; //Reservation note
    private LocalDateTime appointmentTime;

    // Getters
    public UUID getBussinesId() {
        return bussinesId;
    }

    public UUID getUserId() {
        return userId;
    }

    public String getCustomer() {
        return customer;
    }

    public String getNote() {
        return note;
    }

    public LocalDateTime getAppointmentTime() {
        return appointmentTime;
    }

    // Setters
    public void setBussinesId(UUID bussinesId) {
        this.bussinesId = bussinesId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public void setAppointmentTime(LocalDateTime appointmentTime) {
        this.appointmentTime = appointmentTime;
    }
}
