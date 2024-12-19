import { useState, useEffect, useMemo } from "react";

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

export default function useReservations() {
  const [reservations, setReservations] = useState<ReservationsResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getReservations = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/v1/reservations");
      const data = await response.json();
      console.log("fetched data:", data);
      setReservations([...data]);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const createReservation = async (formData: any) => {
    try {
      const response = await fetch("api/v1/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Reservation created successfully:", responseData);
        await getReservations(); // Re-fetch the reservations after creation
      } else {
        console.error("Failed to create reservation:", response.statusText);
      }
    } catch (error) {
      console.error("Error during POST request:", error);
    }
  };

  const updateReservation = async (r: Reservation): Promise<boolean> => {
    const date = new Date(r.appointmentTime);
    // Step 2: Convert the Date object to local time (it will use your system's local time zone)
    const localDateTime = date.toLocaleString();
    const dataToSend = {
      id: r.id,
      businessId: r.businessId,
      userId: r.userId,
      customer: r.customer,
      note: r.note,
      appointmentTime: localDateTime,
    };
    try {
      const response = await fetch(`/api/v1/reservations/${r.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(r),
      });

      if (response.ok) {
        console.log("Reservation updated successfully.");
        return true;
      } else {
        console.error("Failed to update the reservation.");
        return false;
      }
    } catch (error) {
      console.error("Error updating reservation:", error);
      return false;
    }
  };

  useEffect(() => {
    getReservations();
  }, []);

  return useMemo(
    () => [
      reservations,
      isLoading,
      getReservations,
      createReservation,
      updateReservation,
    ],
    [reservations, isLoading]
  );
}
