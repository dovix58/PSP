import React from "react";
import { Box, Typography, TextField } from "@mui/material";

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
      <Box sx={{ px: 3 }}>
        <form>
          <TextField
            id="standard-basic"
            label="Customer's name"
            variant="standard"
          />
        </form>
      </Box>
    </Box>
  );
}
