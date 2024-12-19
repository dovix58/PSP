import React from "react";
import { Box, Typography, TextField, S } from "@mui/material";

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
        <Stack>
          <TextField
            id="standard-basic"
            label="Customer's name"
            variant="standard"
          />
          <TextField
            id="standard-basic"
            label="Customer's name"
            variant="standard"
          />
          <TextField
            id="standard-basic"
            label="Customer's name"
            variant="standard"
          />
          </Stack>
        </form>
      </Box>
    </Box>
  );
}
