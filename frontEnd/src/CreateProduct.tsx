import React, { useEffect, useState } from "react";
import { deleteProduct, getAllProducts, updateProduct, createProduct } from "./api/productAPI.ts";
import { Box, Button, List, ListItem, ListItemText, Modal, TextField, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Styles } from "./Styles.ts";
import EditProductModal from "./EditProduct.tsx";

export default function CreateProduct() {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productQuantity, setProductQuantity] = useState("");

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null); // Product to edit

    useEffect(() => {
        if (open) {
            getAllProducts().then((r) => setItems(r));
        }
    }, [open]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCreateProduct = () => {
        if (!productName || !productPrice) {
            alert("Please enter both name and price.");
            return;
        }

        createProduct(productName, parseFloat(productPrice) * 100, productQuantity)
            .then((newProduct) => {
                setItems((prevItems) => [...prevItems, newProduct]);
                setProductName("");
                setProductPrice("");
                setProductQuantity("");
            })
            .catch((error) => console.error("Error creating product:", error));
    };

    const handleDeleteProduct = (id) => {
        deleteProduct(id)
            .then(() => {
                setItems((prevItems) => prevItems.filter((item) => item.id !== id));
            })
            .catch((error) => console.error("Error deleting product:", error));
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setEditModalOpen(true);
    };

    const handleUpdateProduct = (id, name, price, quantity) => {
        updateProduct(id, name, price, quantity)
            .then(() => {
                setItems((prevItems) =>
                    prevItems.map((item) =>
                        item.id === id ? { ...item, name, price, quantity } : item
                    )
                );
            })
            .catch((error) => console.error("Error updating product:", error));
    };

    return (
        <>
            <Button onClick={handleOpen}>
                <AddCircleIcon />
            </Button>
            <Modal open={open} onClose={handleClose} sx={Styles.modal}>
                <Box sx={Styles.modalBox}>
                    <TextField
                        label="Enter product name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Enter product price"
                        type="number"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Enter product quantity"
                        type="number"
                        value={productQuantity}
                        onChange={(e) => setProductQuantity(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        onClick={handleCreateProduct}
                        variant="contained"
                        color="primary"
                        startIcon={<AddCircleIcon />}
                    >
                        Add Product
                    </Button>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        All products
                    </Typography>
                    <Box sx={{ maxHeight: 320, overflowY: "auto" }}>
                        <List>
                            {items.length > 0 ? (
                                items.map((item) => (
                                    <ListItem key={item.id}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <ListItemText primary={item.name} sx={{ mr: 2 }} />
                                            <ListItemText
                                                primary={new Intl.NumberFormat("en-US", {
                                                    style: "currency",
                                                    currency: "USD",
                                                }).format(item.price / 100)}
                                                sx={{ mr: 2 }}
                                            />
                                            <ListItemText primary={item.quantity} sx={{ mr: 2 }} />
                                            <Button onClick={() => handleEditProduct(item)}>
                                                <EditIcon />
                                            </Button>
                                            <Button onClick={() => handleDeleteProduct(item.id)}>
                                                <RemoveCircleIcon />
                                            </Button>
                                        </Box>
                                    </ListItem>
                                ))
                            ) : (
                                <Typography variant="body1">No items available.</Typography>
                            )}
                        </List>
                    </Box>
                </Box>
            </Modal>

            {/* Edit Product Modal */}
            {selectedProduct && (
                <EditProductModal
                    open={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    product={selectedProduct}
                    onUpdate={handleUpdateProduct}
                />
            )}
        </>
    );
}
