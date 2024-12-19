import React from "react";
import { Box } from "@mui/material";
import ReservationList from "./ReservationList";
import CreateReservation from "./CreateReservation";
import useReservations from "./hooks/useReservations";

export default function BeautyPage() {
  const [
    reservations,
    isLoading,
    isMessage,
    getReservations,
    createReservation,
    updateReservation,
  ] = useReservations();
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
      <CreateReservation
        createReservation={createReservation}
        isMessage={isMessage}
      />
      <ReservationList
        reservations={reservations}
        getReservations={getReservations}
        isLoading={isLoading}
        updateReservation={updateReservation}
      />
    </Box>
  );
}
