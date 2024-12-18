import React, { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { Styles } from "./Styles";

interface EditProductModalProps {
    open: boolean;
    onClose: () => void;
    product: { id: number; name: string; price: number };
    onUpdate: (id: number, name: string, price: number) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ open, onClose, product, onUpdate }) => {
    const [productName, setProductName] = useState(product.name);
    const [productPrice, setProductPrice] = useState((product.price / 100).toString());

    const handleSubmit = () => {
        if (!productName || !productPrice) {
            alert("Please enter both name and price.");
            return;
        }
        onUpdate(product.id, productName, parseFloat(productPrice) * 100);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose} sx={Styles.modal}>
            <Box sx={Styles.modalBox}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Edit Product
                </Typography>
                <TextField
                    label="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Product Price"
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    Submit
                </Button>
            </Box>
        </Modal>
    );
};

export default EditProductModal;
