import React, { useState } from "react";

export default function ReservationList() {
  const [reservations, setReservations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getReservations = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("api/v1/reservations");
      const resData = await res.json();
      setReservations(resData);
      set
    } catch {}
  };
}
