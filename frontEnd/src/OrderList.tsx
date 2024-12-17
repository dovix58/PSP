import {
    Box,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Modal,
    Paper,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import {useEffect, useState} from "react";
import {red} from "@mui/material/colors";

export default function OrderList({refreshOrders,onOrderDeletion}) {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedOrderProduct, setSelectedOrderProduct] = useState([]);

    // Fetch orders from backend API
    const fetchOrders = async () => {
        try {
            const response = await fetch('/api/v1/orders'); // Replace with your API endpoint
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    // Fetch orders on component mount and whenever refreshOrders changes
    useEffect(() => {
        console.log('Fetching orders, refreshOrders changed:', refreshOrders);
        fetchOrders();
    }, [refreshOrders]);


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

    useEffect(() => {
        if (!selectedOrder) return;

        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(`/api/v1/orders/${selectedOrder.id}/totalPrice`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch total price: ${response.statusText}`);
                }

                const data = await response.json(); // Assuming the total price is returned directly
                console.log(data)
                setTotalPrice(data/ 100); // Convert from cents to dollars
            } catch (error) {
                console.error('Error fetching total price:', error);
                setTotalPrice(0);  // Reset on error
            }

        };

        fetchOrderDetails();
    }, [selectedOrder]);  // Run when selectedOrder changes

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

    const handleCloseEditModal = () => {
        setEditModalOpen(false);

    }
    const handleOpenEditModal = (product) =>{
        setSelectedOrderProduct(product);
        setEditModalOpen(true);
    }
    const handleCancelOrder = async () => {
        try {
            const response = await fetch(`/api/v1/orders/${selectedOrder.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                // Handle server errors or invalid responses
                throw new Error(`Error: ${response.statusText}`);
            }
            onOrderDeletion();
            alert('Order Delted Succesfully!');
            handleCloseModal(); // Close the modal

            // Process the response (e.g., update UI or state)
            console.log('Order canceled successfully');
            // You might want to update your state or trigger a UI update here

        } catch (error) {
            // Handle network or unexpected errors
            console.error('Failed to cancel order:', error);
        }
    };

    const handleOrderProductUpdate = async (index, productId, value) => {
        const response = await fetch(`/api/v1/orders/${selectedOrder.id}/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quantity: value,
            }),
        });
        onOrderDeletion();
    }

    return (
        <Box
            sx={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "8px",
                margin: "8px 0",
                maxHeight: 400,
                width: 400,
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
                        minWidth: '500px',
                        maxWidth: '800px',
                        height: '400px'
                    }}
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"

                    >
                        <Typography id="order-details-title" variant="h6" gutterBottom>
                            Order Details
                        </Typography>
                        <Tooltip title="Cancel Order">
                            <Button
                                sx={{
                                    backgroundColor: 'darkred', // Red background color
                                    color: 'white', // White color for the 'X'
                                     // Make the button round
                                    width: 35, // Button width
                                    height: 35, // Button height
                                    top: -7,
                                }}
                                onClick={handleCancelOrder}
                            >
                                Cancel
                            </Button>
                        </Tooltip>

                    </Box>

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
                            <Box sx={{ maxHeight: 160, overflowY: "auto",  border: '1px solid #000', }}>
                                <List>
                                    {products.map((product, index) => (
                                        <ListItem
                                            key={index}
                                            divider

                                        >
                                            <Box display="flex" justifyContent="flex-end" width="100%" flexDirection="column">
                                                <Typography>
                                                    Product: {product.name}
                                                </Typography>
                                                <Button
                                                    sx={{ width: 4, backgroundColor: 'gray', color: 'black' }}
                                                onClick={() => handleOpenEditModal(product)}>
                                                    Edit
                                                </Button>

                                                <Box ml="auto" display="flex" gap={2}>
                                                    <Typography>
                                                        Amount: {product.quantity}
                                                    </Typography>
                                                    <Typography>
                                                        {product.price / 100}$
                                                    </Typography>
                                                </Box>

                                            </Box>
                                        </ListItem>
                                    ))}
                                </List>

                            </Box>
                            <Box display="flex" justifyContent="flex-end" mt={1}>

                                <Typography variant="h6">Total Price: ${totalPrice}</Typography>
                            </Box>
                        </Box>
                    ) : (
                        <Typography variant="body1">No order selected.</Typography>
                    )}
                </Paper>
            </Modal>
            {/* Edit Product Modal */}
            <Modal
                open={isEditModalOpen}
                onClose={handleCloseEditModal}
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
                    <Typography variant="h6">Edit Product</Typography>
                    <TextField label="Product Quantity" fullWidth margin="normal" />
                    <Box display="flex" justifyContent="flex-end" mt={2}>
                        <Button onClick={handleCloseEditModal}>Cancel</Button>
                        <Button sx={{ ml: 1 }} variant="contained" color="primary">Save</Button>
                    </Box>
                </Paper>
            </Modal>
        </Box>
    );
}