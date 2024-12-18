import { Box, Button, Modal, Paper, TextField, Typography, List, ListItem } from "@mui/material";
import { useState } from "react";
import {updateOrder} from "./api/OrderApi.ts";

export default function PaymentModal({ isOpen, onClose, order, products, totalPrice }) {
    const [paid, setPaid] = useState(false);
    const [cardDetails, setCardDetails] = useState({ cardNumber: "", expiry: "", cvv: "" });

    const handlePay = () => {
        updateOrder(order.id)
        setPaid(true)
    };

    const handleChange = (field, value) => {
        setCardDetails({ ...cardDetails, [field]: value });
    };

    const renderReceipt = () => (
        <Box>
            <Typography variant="h6">Order Receipt</Typography>
            <List>
                {products.map((product, index) => (
                    <ListItem key={index}>
                        <Typography>
                            {product.name} - {product.quantity} x ${product.price / 100}
                        </Typography>
                    </ListItem>
                ))}
            </List>
            <Typography variant="h6" mt={2}>
                Total: ${totalPrice / 100}
            </Typography>
        </Box>
    );

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Paper
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    padding: "20px",
                    minWidth: "400px",
                }}
            >
                {paid ? (
                    renderReceipt()
                ) : (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Payment Options
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mb: 2 }}
                            onClick={handlePay}
                        >
                            Pay by Cash
                        </Button>
                        <Typography variant="subtitle1" gutterBottom>
                            Pay by card:
                        </Typography>
                        <TextField
                            label="Card Number"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(e) => handleChange("cardNumber", e.target.value)}
                        />
                        <Box display="flex" gap={2} sx={{ mb: 2 }}>
                            <TextField
                                label="Expiry Date"
                                placeholder="MM/YY"
                                onChange={(e) => handleChange("expiry", e.target.value)}
                            />
                            <TextField
                                label="CVV"
                                placeholder="123"
                                onChange={(e) => handleChange("cvv", e.target.value)}
                            />
                        </Box>
                        <Button
                            variant="contained"
                            color="secondary"
                            fullWidth
                            sx={{ mb: 2 }}
                            onClick={handlePay}
                        >
                            Pay by Card
                        </Button>
                        <Typography sx={{ mb: 2 }} variant="subtitle1" gutterBottom>
                            Pay by gift card:
                        </Typography>
                        <Box>
                            <TextField
                                label="Gift card number"
                                fullWidth
                                sx={{ mb: 2 }}
                                onChange={(e) => handleChange("cardNumber", e.target.value)}
                            />
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handlePay}
                        >
                            Pay by gift card
                        </Button>
                    </Box>
                )}
            </Paper>
        </Modal>
    );
}
