import React, { useState } from 'react';

export default function ReservationList() {
    const [reservations, setReservations] = useState(null);

    const getReservations = async () => {
        try{
            const res = async fetch("api/v1/reservations")
        } catch {

        }
    }
}