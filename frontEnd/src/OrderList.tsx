import {Box, List, ListItem, ListItemText, Modal, Paper, Typography} from "@mui/material";
import {useEffect, useState} from "react";

export default function OrderList() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    // Fetch orders from backend API
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/v1/orders');
                if (!response.ok) throw new Error('Failed to fetch orders');
                const data = await response.json();
                setOrders(data);
            } catch (err) {
                // If an error occurs, treat it as no orders
                setOrders([]);
            }
        };

        fetchOrders();
    }, []);


    useEffect(() => {
        const fetchProductsFromOrders = async () => {
            if (!selectedOrder) return; // Ensure there's a selected order before fetching

            try {
                const response = await fetch(`/api/v1/orders/${selectedOrder.id}/products`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json(); // Parse the JSON response
                setProducts(data); // Update state with the fetched products
            } catch (err) {
                console.error("Failed to fetch products:", err);
                setProducts([]); // Clear products on error
            }
        };

        fetchProductsFromOrders();
    }, [selectedOrder]); // Only re-run if selectedOrder changes

    const formatDate = (isoDate: string): string => {
        const date = new Date(isoDate);
        return new Intl.DateTimeFormat('lt-LT', {
            dateStyle: 'long',  // 'short' | 'medium' | 'long' | 'full'
            timeStyle: 'short', // 'short' | 'medium' | 'long' | 'full'
        } as Intl.DateTimeFormatOptions).format(date);
    };

    const handleItemClick = (order) => {
        setSelectedOrder(order);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedOrder(null);
    };

    return (
        <Box
            sx={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "8px",
                margin: "8px 0",
                maxHeight: 400,
                overflowY: "auto"
            }}
        >
            <Typography variant="h4" gutterBottom>
                Orders List
            </Typography>
            {orders.length === 0 ? (
                <Typography variant="body1">You don't have orders.</Typography>
            ) : (
                <List>
                    {orders.map((order, index) => (
                        <ListItem
                            key={index}
                            divider
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'limegreen',
                                    cursor: 'pointer',
                                },
                            }}
                            onClick={() => handleItemClick(order)}
                        >
                            <ListItemText
                                primary={`Order #${index + 1}`}
                                secondary={`${formatDate(order.created)}`}
                            />
                        </ListItem>
                    ))}
                </List>
            )}

            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="order-details-title"
                aria-describedby="order-details-description"
            >
                <Paper
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        padding: '16px',
                        minWidth: '300px',
                        maxWidth: '500px',
                    }}
                >
                    <Typography id="order-details-title" variant="h6" gutterBottom>
                        Order Details
                    </Typography>
                    {selectedOrder ? (
                        <Box>
                            <Typography id="order-details-description" variant="body1">
                                <strong>Order ID:</strong> {selectedOrder.id}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Created:</strong> {formatDate(selectedOrder.created)}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Status:</strong> {selectedOrder.orderStatus}
                            </Typography>
                                <List>
                                    {products.map((product, index) => (
                                        <ListItem
                                            key={index}
                                            divider
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: 'limegreen',
                                                    cursor: 'pointer',
                                                },
                                            }}
                                        >
                                            {product.name}
                                        </ListItem>
                                    ))}
                                </List>
                        </Box>
                    ) : (
                        <Typography variant="body1">No order selected.</Typography>
                    )}
                </Paper>

            </Modal>
        </Box>
    );
}