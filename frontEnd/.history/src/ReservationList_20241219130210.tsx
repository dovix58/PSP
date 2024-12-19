import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";

interface Reservation {
  id: string; // UUID
  businessId: string; // UUID
  userId: string; // UUID
  customer: string;
  note: string;
  createdAt: string; // ISO 8601 DateTime format
  updatedAt: string; // ISO 8601 DateTime format
  appointmentTime: string; // ISO 8601 DateTime format
}

type ReservationsResponse = Reservation[];

export default function ReservationList() {
  const [reservations, setReservations] = useState<null | ReservationsResponse>(
    null
  );
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
        width: 800,
        overflowY: "auto",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Reservations List
      </Typography>{" "}
      {isLoading ? (
        <CircularProgress />
      ) : reservations != null && reservations.length === 0 ? (
        <Typography variant="h6">No reservations are made...</Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Customer's name</TableCell>
                <TableCell align="left">Reservation note</TableCell>
                <TableCell align="left">Appointment Time</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            {reservations?.map((r, index) => (
              <TableRow key={r.id}>
                <TableCell align="left">{r.customer}</TableCell>
                <TableCell align="left">{r.note}</TableCell>
                <TableCell align="left">{const formattedDate = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
}).format(r.appointmentTime);}</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            ))}
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
