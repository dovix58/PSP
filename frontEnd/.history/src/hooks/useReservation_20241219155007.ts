import { useState, useEffect } from "react";

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
  const [reservations, setReservations] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getReservations = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/v1/reservations");
      const data = await response.json();
      console.log(data);
      setReservations((prevReservations) => [...data]);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const createReservation = async (formData) => {
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

  useEffect(() => {
    getReservations();
  }, []);

  return [reservations, isLoading, getReservations, createReservation];
}
