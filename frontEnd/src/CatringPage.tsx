import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import CreateOrder from "./CreateOrder";
import OrderList from "./OrderList";

// Main component that will render MyComponent and the list of items
export default function CateringPage() {

    useEffect(() => {

    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column', // Stack boxes vertically
                alignItems: 'center', // Center horizontally
                justifyContent: 'center', // Center vertically
                height: '100vh', // Full viewport height
                gap: 2, // Space between the boxes
            }}
        >
            <OrderList/>
            <CreateOrder/>
        </Box>
    );
};
