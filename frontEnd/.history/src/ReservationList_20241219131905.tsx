import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
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

  const onDeleteHandler = ()

  const deleteReservations = async (id) => {
    fetch(`api/v1/reservations/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          console.log("Reservation deleted successfully.");
        } else {
          console.error("Failed to delete the reservation.");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

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
            <TableBody>
              {reservations?.map((r, index) => (
                <TableRow key={r.id}>
                  <TableCell align="left">{r.customer}</TableCell>
                  <TableCell align="left">{r.note}</TableCell>
                  <TableCell align="left">
                    {format(new Date(r.appointmentTime), "MMMM d, yyyy hh:mm ")}
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteReservations(r.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
