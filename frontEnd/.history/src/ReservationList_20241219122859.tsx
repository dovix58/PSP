import React, { useEffect, useState } from "react";
import { Box, Typography, List, Ciru } from "@mui/material";


export default function ReservationList() {
  const [reservations, setReservations] = useState<null | any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getReservations = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("api/v1/reservations");
      const resData = await res.json();
      console.log(resData);
      setReservations(resData);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.error("Error fetching reservations:", e);
    }
  };

  useEffect(() => {
    getReservations();
  }, []);
  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "8px",
        margin: "8px 0",
        maxHeight: 400,
        width: 400,
        overflowY: "auto",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Reservations List
      </Typography>{" "}
      {isLoading ? {
          <CircularProgress/> 
      }}
    </Box>
  );
}
