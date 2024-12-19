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
  Stack,
  Modal,
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

export default function ReservationList(props: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Handler for a delete button
  const onDeleteHandler = async (id: string) => {
    try {
      const success = await deleteReservations(id);
      if (success) {
        await props.getReservations(); // Fetch updated reservations only on success
      }
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  };

  const onEditHandler = async (id: string) => {};

  const deleteReservations = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`api/v1/reservations/${id}`, {
        method: "DELETE",
      });
      if (response.status === 204) {
        console.log("Reservation deleted successfully.");
        return true;
      } else {
        console.error("Failed to delete the reservation.");
        return false;
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      return false;
    }
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
        Reservations List
      </Typography>{" "}
      {props.isLoading ? (
        <CircularProgress />
      ) : props.reservations != null && props.reservations.length === 0 ? (
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
              {props.reservations?.map((r: Reservation, index: any) => (
                <TableRow key={r.id}>
                  <TableCell align="left">{r.customer}</TableCell>
                  <TableCell align="left">{r.note}</TableCell>
                  <TableCell align="left">
                    {format(new Date(r.appointmentTime), "MMMM d, yyyy hh:mm ")}
                  </TableCell>
                  <TableCell align="left">
                    <Stack direction="row" spacing={1}>
                      {" "}
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => onDeleteHandler(r.id)}
                      >
                        Delete
                      </Button>
                      <Button variant="outlined" onClick={() => handleOpen}>
                        Edit
                      </Button>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                          >
                            Text in a modal
                          </Typography>
                          <Typography
                            id="modal-modal-description"
                            sx={{ mt: 2 }}
                          >
                            Duis mollis, est non commodo luctus, nisi erat
                            porttitor ligula.
                          </Typography>
                        </Box>
                      </Modal>
                    </Stack>
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
