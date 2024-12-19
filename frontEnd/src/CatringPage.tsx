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
        fetch('/logout', { method: 'GET' }) // or GET based on your configuration
            .then(() => {
                navigate('/')
            })
    };

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
