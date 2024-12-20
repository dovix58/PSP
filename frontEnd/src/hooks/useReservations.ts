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

interface errMsg {
  message: string;
  isError: boolean;
}

type ReservationsResponse = Reservation[];

export default function useReservations() {
  const [reservations, setReservations] = useState<ReservationsResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMessage, setIsMessage] = useState<boolean | errMsg>(false);

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
    console.log(formData);
    fetch("/api/v1/reservations", {
      method: "POST", // HTTP method
      headers: {
        "Content-Type": "application/json", // Indicate the content type is JSON
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        // If response is not OK (status code 200-299), handle the error
        if (!response.ok) {
          // If it's not a successful response, throw an error
          return response.json().then((errorData) => {
            throw new Error(errorData.message || "Something went wrong");
          });
        }
        // If response is OK, parse the response data
        return response.json();
      })
      .then((data) => {
        // Handle success (for example, log the success message)
        console.log("Success:", data.message);
        getReservations(); // Re-fetch the reservations after creation
        setIsMessage({ message: data.message, isError: false });
      })
      .catch((error) => {
        // Handle error (this will run if the status code is 400 or other errors)
        setIsMessage({ message: error.message, isError: true });
        console.log("Error:", error.message);
      });
  };

  const updateReservation = async (r: Reservation): Promise<boolean> => {
    const date = new Date(r.appointmentTime);
    // Step 2: Convert the Date object to local time (it will use your system's local time zone)
    const localDateTime = date.toLocaleString();
    const dataToSend: any = {
      id: r.id,
      businessId: r.businessId,
      userId: r.userId,
      customer: r.customer,
      note: r.note,
      appointmentTime: localDateTime,
    };
    try {
      const response = await fetch(`/api/v1/reservations/${dataToSend.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
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
      isMessage,
      getReservations,
      createReservation,
      updateReservation,
    ],
    [reservations, isLoading, isMessage]
  );
}
