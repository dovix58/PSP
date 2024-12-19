package psp.pos_system.dtos.reservation;

import java.time.LocalDateTime;
import java.util.UUID;

public class ReservationUpdateDTO {
    private UUID businessId;
    private UUID userId;
    private LocalDateTime appointmentTime;
    private String customer;
    private String note;


    // Getters
    public UUID getBusinessId() {
        return businessId;
    }

    public UUID getUserId() {
        return userId;
    }

    public LocalDateTime getAppointmentTime() { return appointmentTime; }

    public String getCustomer() { return customer; }

    public String getNote() { return note; }

    // Setters
    public void setBussinesId(UUID bussinesId) {
        this.businessId = bussinesId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public void setAppointmentTime(LocalDateTime appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public void setNote(String note) {
        this.note = note;
    }




}
