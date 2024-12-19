import React from "react";
import { Box } from "@mui/material";
import ReservationList from "./ReservationList";

export default function BeautyPage() {
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <ReservationList />
    </Box>
  );
}
