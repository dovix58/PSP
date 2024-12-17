import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import CreateOrder from "./CreateOrder";
import OrderList from "./OrderList";

// Main component that will render MyComponent and the list of items
export default function CateringPage() {
    const [refreshOrders, setRefreshOrders] = useState(false);

    const handleOrderAdded = () => {
        setRefreshOrders((prev) => !prev);
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
            <OrderList refreshOrders={refreshOrders} onOrderDeletion={handleOrderAdded} />
            <CreateOrder onOrderAdded={handleOrderAdded} />
        </Box>
    );
}
