import React, { useState, useEffect } from 'react';
import {Box, Grid, Typography, List, ListItem, ListItemText, CircularProgress, Button} from '@mui/material';
import CreateOrder from "./CreateOrder";
import OrderList from "./OrderList";
import CreateProduct from "./CreateProduct.tsx";
import {useNavigate} from "react-router-dom";

// Main component that will render MyComponent and the list of items
export default function CateringPage() {
    const [refreshOrders, setRefreshOrders] = useState(false);
    const navigate = useNavigate();

    const handleOrderAdded = () => {
        setRefreshOrders((prev) => !prev);
    };
    const handleLogout = () => {
        const response = fetch('/logout', {
            method: 'POST',
            credentials: 'include', // Include cookies (session management)
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(() => navigate("/"))
    };

    // const handleLogout= async () => {
    //     try {
    //         // Send a GET request to the backend to fetch user details
    //         const response = await fetch('/api/v1/user', {
    //             method: 'GET',
    //             credentials: 'include', // Include cookies if using session-based authentication
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //
    //         if (response.ok) {
    //             // Parse the JSON response
    //             const userDetails = await response.json();
    //             console.log('User Details:', userDetails);
    //
    //         } else {
    //             console.error('Failed to fetch user details:', response.statusText);
    //             return null;
    //         }
    //     } catch (error) {
    //         console.error('Error while fetching user details:', error);
    //         return null;
    //     }
    // }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                gap: 2,
            }}
        >
            <CreateProduct />
            <OrderList refreshOrders={refreshOrders} onOrderDeletion={handleOrderAdded} />
            <CreateOrder onOrderAdded={handleOrderAdded} />
            <a href="/logout">Logout</a>
            <Button onClick={handleLogout}> buttonas</Button>
        </Box>
    );
}
