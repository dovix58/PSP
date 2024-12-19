import React from "react";
import { Box, Typography, TextField, Stack, Button } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function CreateReservation() {
  const submitForm = async (e) => {
    e.preventDefault();
  };

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
            <TextField id="name" label="Customer's name" variant="standard" />
            <TextField id="note" label="Note" variant="standard" />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-Gb"}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="Appointment time"
                  views={["year", "month", "day", "hours"]}
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
