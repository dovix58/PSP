import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Box, Typography, TextField, Stack, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";

export default function CreateReservation() {
  const submitForm = async (e) => {
    e.preventDefault();
    const date = new Date(appointmentTime);
    // Step 2: Convert the Date object to local time (it will use your system's local time zone)
    const localDateTime = date.toLocaleString();

    const formData = {
      customer: name, // The name of the customer
      note: note, // The reservation note
      appointmentTime: localDateTime, // The converted appointment time
    };

    try {
      const response = await fetch("api/v1/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // We are sending JSON data
        },
        body: JSON.stringify(formData), // Send the form data as JSON
      });

      if (response.ok) {
        const responseData = await response.json(); // Parse JSON response
        console.log("Reservation created successfully:", responseData);
        setName("");
        set
      } else {
        console.error("Failed to create reservation:", response.statusText);
      }
    } catch (error) {
      console.error("Error during POST request:", error);
    }
  };

  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [appointmentTime, setAppointmentTime] = useState<Dayjs | null>(null);

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "8px",
        margin: "8px 0",
        maxHeight: 400,
        width: 800,
        overflowY: "auto",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Create reservation
      </Typography>
      <Box sx={{ display: "flexColumn", px: 2, py: 1 }}>
        <form onSubmit={submitForm}>
          <Stack spacing={2}>
            <TextField
              id="name"
              label="Customer's name"
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="note"
              label="Note"
              variant="standard"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="en-gb"
            >
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="Appointment time"
                  views={["year", "month", "day", "hours"]}
                  value={appointmentTime}
                  onChange={(newValue) => setAppointmentTime(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
            <Stack direction="row" spacing={3}>
              <Button variant="outlined" color="success" type="submit">
                Save
              </Button>
              <Button variant="outlined" color="error" type="reset">
                Discard
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}
