package psp.pos_system.dtos.reservation;

import jakarta.annotation.Nullable;

import java.time.LocalDateTime;
import java.util.UUID;

public class ReservationCreateDTO {
    private UUID businessId;
    private UUID userId;
    private String customer; // Customer's name
    private String note; //Reservation note
    private String appointmentTime;

    // Getters
    @Nullable
    public UUID getBusinessId() {
        return businessId;
    }

    @Nullable
    public UUID getUserId() {
        return userId;
    }

    @Nullable
    public String getCustomer() {
        return customer;
    }

    @Nullable
    public String getNote() {
        return note;
    }

    @Nullable
    public String getAppointmentTime() {
        return appointmentTime;
    }

    // Setters
    public void setBusinessId(UUID bussinesId) {
        this.businessId = bussinesId;
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

    public void setAppointmentTime(String appointmentTime) {
        this.appointmentTime = appointmentTime;
    }
}
