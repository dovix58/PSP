import { Box, Button, Modal, Paper, TextField, Typography, List, ListItem } from "@mui/material";
import { useState } from "react";
import {closeOrder} from "./api/OrderApi.ts";

export default function PaymentModal({ isOpen, onClose, order, products, totalPrice }) {
    const [paid, setPaid] = useState(false);
    const [cardDetails, setCardDetails] = useState({ cardNumber: "", expiry: "", cvv: "" });
    const [splitOpen, setSplitOpen] = useState(false);
    const [numberOfPayments, setNumberOfPayments] = useState(0);
    const [paymentAmounts, setPaymentAmounts] = useState([]);

    const handlePay = () => {
        closeOrder(order.id)
        setPaid(true)
    };

    const handleChange = (field, value) => {
        setCardDetails({ ...cardDetails, [field]: value });
    };

    const handleSplitCheque = () => {
        if (numberOfPayments > 0) {
            const amounts = Array.from({ length: numberOfPayments }, (_, index) =>
                Math.round(totalPrice / numberOfPayments) + (index < totalPrice % numberOfPayments ? 1 : 0)
            );
            setPaymentAmounts(amounts);
            setSplitOpen(true);
        }
    };

    const renderReceipt = () => (
        <>
            <Box>
                <Typography variant="h6">Order Receipt</Typography>
                <List>
                    {products.map((product, index) => (
                        <ListItem key={index}>
                            <Typography>
                                {product.name} - {product.quantity} x {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                            }).format(product.price / 100)}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
                <Typography variant="h6" mt={2}>
                    Total: ${totalPrice / 100}
                </Typography>
                <Typography sx={{ mb: 2 }} variant="subtitle1" gutterBottom>
                    Split cheque:
                </Typography>
                <Box display="flex" gap={2} alignItems="center" sx={{ mb: 2 }}>
                    <TextField
                        label="Number of Payments"
                        type="number"
                        onChange={(e) => setNumberOfPayments(Number(e.target.value))}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSplitCheque}
                    >
                        Split
                    </Button>
                </Box>
            </Box>
            <Modal open={splitOpen} onClose={() => setSplitOpen(false)}>
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
                    <Typography variant="h6" gutterBottom>
                        Split Payments
                    </Typography>
                    <List>
                        {paymentAmounts.map((amount, index) => (
                            <ListItem key={index}>
                                <Typography>Payment {index + 1}: {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                }).format(amount / 100)}</Typography>
                            </ListItem>
                        ))}
                    </List>
                    <Button variant="contained" color="primary" fullWidth onClick={() => setSplitOpen(false)}>
                        Close
                    </Button>
                </Paper>
            </Modal>
        </>
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
