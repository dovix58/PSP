import { useState, useEffect } from "react";

export default function useReservations() {
  const [reservations, setReservations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getReservations = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/v1/reservations");
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getReservations();
  }, []);

  return { reservations, isLoading, getReservations };
}
