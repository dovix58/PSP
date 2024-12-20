import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    List,
    ListItem,
    ListItemText, MenuItem,
    Modal, Select, TextField,
    Tooltip,
    Typography
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import React, {ReactNode, useEffect, useState} from "react";
import {getAllProducts} from "./api/productAPI";


export default function CreateOrder({onOrderAdded}){
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);


    // Fetch items from backend
    useEffect(() => {
        if (open) {
            getAllProducts().then(r => setItems(r));
        }
    }, [open]);



    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [pickedItems, setPickedItems] = useState([]);
    const [quantities, setQuantities] = useState({});

    const handleItemClick = (id) => {
        setPickedItems((prevPickedItems) => {
            if (prevPickedItems.includes(id)) {
                return prevPickedItems.filter((pickedId) => pickedId !== id);
            } else {
                return [...prevPickedItems, id];
            }
        });
    };


    const handleQuantityChange = (id, value) => {
        const parsedValue = parseInt(value, 10);
        if (!isNaN(parsedValue) && parsedValue > 0) {
            setQuantities((prevQuantities) => ({
                ...prevQuantities,
                [id]: parsedValue,
            }));
        }
    };
    const handleCreateOrder = async () => {
        try {

            const createOrderResponse = await fetch('/api/v1/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (createOrderResponse.status !== 201) {
                throw new Error('Failed to create order');
            }

            onOrderAdded();
            const createOrderData = await createOrderResponse.json();
            const orderId = createOrderData.id; // Assuming the orderId is returned

            const selectedProducts = pickedItems.map((itemId) => ({
                productId: itemId,
                quantity: quantities[itemId] || 1,
            }));

            const orderProductRequests = selectedProducts.map((product) =>
                fetch(`/api/v1/orders/${orderId}/products`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        productId: product.productId,
                        quantity: product.quantity,
                    }),
                })
            );

            await Promise.all(orderProductRequests);

            alert('Order and Order Products created successfully!');
            handleClose(); // Close the modal
        } catch (error) {
            console.error('Error creating order:', error);
            alert('An error occurred while creating the order.');
        }
    };

    useEffect(() => {
        console.log("Picked Items:", pickedItems);
        console.log("Quantities:", quantities);
    }, [pickedItems, quantities]);



    return (
        <>

            <Button
                sx={{
                    minWidth: 0,
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: 'green',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'limegreen',
                    },
                }}
                onClick={handleOpen}
            >
                <AddIcon />
            </Button>
            {/* Modal Component */}
            <Modal
                open={open}
                onClose={handleClose}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                        All products
                    </Typography>

                    <Box sx={{ maxHeight: 320, overflowY: "auto" }}>
                        <List>
                            {items.length > 0 ? (
                                items.map((item) => (
                                    <ListItem key={item.id}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item xs={8}>
                                                <Box
                                                    onClick={() => handleItemClick(item.id)}
                                                    sx={{
                                                        border: "1px solid #ccc",
                                                        borderRadius: "8px",
                                                        padding: "8px",
                                                        margin: "8px 0",
                                                        backgroundColor: pickedItems.includes(item.id)
                                                            ? "limegreen"
                                                            : "#f9f9f9",
                                                        cursor: "pointer",
                                                        transition: "background-color 0.3s",
                                                    }}
                                                >
                                                    <ListItemText primary={item.name} />
                                                    <ListItemText primary={item.quantity} />
                                                </Box>
                                            </Grid>

                                            <Grid item xs={4}>
                                                {pickedItems.includes(item.id) && (
                                                    <TextField
                                                        label="Quantity"
                                                        type="number"
                                                        value={quantities[item.id] || ""}
                                                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                                        fullWidth
                                                        variant="outlined"
                                                        inputProps={{ min: "1" }} // Optional: ensures that the minimum value is 1
                                                    />
                                                )}
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                ))
                            ) : (
                                <Typography variant="body1">No items available.</Typography>
                            )}
                        </List>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCreateOrder}
                            disabled={pickedItems.length === 0}
                        >
                            Create Order
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}