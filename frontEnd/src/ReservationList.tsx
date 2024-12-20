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
  TextField,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface Reservation {
  id: string; // UUID
  businessId: string; // UUID
  userId: string; // UUID
  customer: string;
  note: string;
  createdAt: string; // ISO 8601 DateTime format
  updatedAt: string; // ISO 8601 DateTime format
  fulfilled: boolean;
  appointmentTime: string; // ISO 8601 DateTime format
}

export default function ReservationList(props: any) {
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [editingValues, setEditingValues] = useState<Reservation | null>(null);

  // Handler to start editing
  const onEditHandler = (reservation: Reservation) => {
    setEditingRowId(reservation.id); // Set the row being edited
    setEditingValues({ ...reservation }); // Initialize with current values
  };

  const onFulfillHandler = async (id: any) => {
    try {
      const response = await fetch(`/api/v1/reservations/fulfill/${id}`, {
        method: "PUT",
      });

      if (response.ok) {
        const message = await response.text(); // Assuming the response is plain text
        alert(message); // Show success message
        props.getReservations();
      } else {
        const errorMessage = await response.text();
        alert(errorMessage); // Show error message
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  // Handler to save the edited reservation
  const onSaveHandler = async () => {
    if (editingValues) {
      try {
        const success = await props.updateReservation(editingValues);
        if (success) {
          await props.getReservations(); // Refresh reservations
          setEditingRowId(null); // Exit edit mode
          setEditingValues(null); // Clear edit state
        }
      } catch (error) {
        console.error("Error updating reservation:", error);
      }
    }
  };

  // Handler to cancel editing
  const onCancelEditHandler = () => {
    setEditingRowId(null); // Exit edit mode
    setEditingValues(null); // Clear edit state
  };

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
                <TableRow
                  key={r.id}
                  style={{
                    backgroundColor: r.fulfilled ? "#EAFFF1" : "#fad1d0",
                  }}
                >
                  {editingRowId !== r.id ? (
                    <>
                      <TableCell align="left">{r.customer}</TableCell>
                      <TableCell align="left">{r.note}</TableCell>
                      <TableCell align="left">
                        {format(
                          new Date(r.appointmentTime),
                          "MMMM d, yyyy HH:mm "
                        )}
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
                          <Button
                            variant="outlined"
                            onClick={() => onEditHandler(r)}
                          >
                            Edit
                          </Button>
                          {r.fulfilled ? (
                            ""
                          ) : (
                            <Button
                              variant="outlined"
                              color="success"
                              onClick={() => {
                                onFulfillHandler(r.id);
                              }}
                            >
                              Fulfill
                            </Button>
                          )}
                        </Stack>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell align="left">
                        <TextField
                          value={editingValues?.customer || ""}
                          onChange={(e) =>
                            setEditingValues((prev) =>
                              prev
                                ? { ...prev, customer: e.target.value }
                                : null
                            )
                          }
                        />
                      </TableCell>
                      <TableCell align="left">
                        <TextField
                          value={editingValues?.note || ""}
                          onChange={(e) =>
                            setEditingValues((prev) =>
                              prev ? { ...prev, note: e.target.value } : null
                            )
                          }
                        />
                      </TableCell>
                      <TableCell align="left">
                        <LocalizationProvider
                          dateAdapter={AdapterDayjs}
                          adapterLocale="en-gb"
                        >
                          <DemoContainer components={["DateTimePicker"]}>
                            <DateTimePicker
                              label="Appointment time"
                              views={["year", "month", "day", "hours"]}
                              value={
                                editingValues?.appointmentTime
                                  ? dayjs(editingValues.appointmentTime)
                                  : null
                              }
                              onChange={(newValue) => {
                                if (newValue) {
                                  newValue = newValue
                                    .set("minute", 0)
                                    .set("second", 0); // Set minutes and seconds to 00
                                }

                                // Update the value in the state
                                setEditingValues((prev) =>
                                  prev
                                    ? {
                                        ...prev,
                                        appointmentTime: newValue
                                          ? newValue.toISOString()
                                          : null,
                                      }
                                    : null
                                );
                              }}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </TableCell>
                      <TableCell align="left">
                        <Stack direction="row" spacing={1}>
                          <Button
                            variant="outlined"
                            color="success"
                            onClick={onSaveHandler}
                          >
                            Save
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={onCancelEditHandler}
                          >
                            Cancel
                          </Button>
                        </Stack>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
