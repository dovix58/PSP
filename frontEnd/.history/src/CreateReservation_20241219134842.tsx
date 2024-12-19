import React from "react";
import { Box, Typography, TextField, Stack, Button } from "@mui/material";

export default function CreateReservation() {
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
        <form>
          <Stack spacing={2}>
            <TextField id="name" label="Customer's name" variant="standard" />
            <TextField id="note" label="Note" variant="standard" />
            <TextField id="time" label="Appointment time" variant="standard" />
            <Stack dierction="row">
              <Button variant="outlined" color="success">
                Save
              </Button>
              <Button variant="outlined" color="error">
                Discard
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}
