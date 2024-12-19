import React from "react";
import { Box } from "@mui/material";
import ReservationList from "./ReservationList";
import CreateReservation from "./CreateReservation";
import useReservations from "./hooks/useReservations";

export default function BeautyPage() {
  const { reservations, isLoading, getReservations, createReservation } =
    useReservations();
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: 3,
      }}
    >
      <CreateReservation createReservation={createReservation}/>
      <ReservationList reservations={reservations} getReservations={getReservations} />
    </Box>
  );
}
