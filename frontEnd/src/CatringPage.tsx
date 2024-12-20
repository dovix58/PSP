import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import CreateOrder from "./CreateOrder";
import OrderList from "./OrderList";
import CreateProduct from "./CreateProduct.tsx";
import CreateCategory from './CreateCategory.tsx';
import {
    Button,  Dialog, DialogActions, DialogContent, DialogTitle,
    TextField,  IconButton, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserList from './UserList'; // Assuming this component exists
import AddIcon from '@mui/icons-material/Add'; // Green plus icon

export default function CateringPage() {
    const [refreshOrders, setRefreshOrders] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [openCreateUserModal, setOpenCreateUserModal] = useState(false);
    const [newUser, setNewUser] = useState(null);
    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
        roles: []
    });
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');
    const navigate = useNavigate();

    const handleOrderAdded = () => {
        setRefreshOrders((prev) => !prev);
    };

    const handleLogout = () => {
        const response = fetch('/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(() => navigate("/"));
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleOpenCreateUserModal = () => {
        setOpenCreateUserModal(true);
    };

    const handleCloseCreateUserModal = () => {
        setOpenCreateUserModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };


    const handleRoleChange = (event) => {
        const { value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            roles: [value],
        }));
    };


    const handleCreateUser = async () => {
        setFormError('');
        setFormSuccess('');

        // Check if all necessary form fields are provided
        if (!formValues.username || !formValues.password || !formValues.roles.length) {
            setFormError('Username, password, and role are required');
            return;
        }

        try {

            if (formValues.roles.includes('ROLE_OWNER')) {
                formValues.roles.push('ROLE_EMPLOYEE');
            }

            const response = await fetch('/api/v1/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formValues.username,
                    password: formValues.password,
                    roles: formValues.roles,
                }),
            });

            // Check if the response was successful
            if (!response.ok) {
                throw new Error('Failed to create user');
            }

            // Set the new user and success message
            setNewUser(formValues);
            setFormSuccess('User created successfully');

            // Reset form values
            setFormValues({ username: '', password: '', roles: [] });

            // Close the modal
            handleCloseCreateUserModal();
        } catch (err) {
            // Handle errors
            setFormError(err.message);
        }
    };

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch('/api/v1/user');
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                console.log(data);
                setLoggedInUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, []);


    const isOwner = loggedInUser && loggedInUser.authorities && loggedInUser.authorities.some(auth => auth.authority === 'ROLE_OWNER');

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
            <CreateCategory/>
            <Typography>
                Logged in as: {loggedInUser.username}
            </Typography>
            <CreateProduct />
            <OrderList refreshOrders={refreshOrders} onOrderDeletion={handleOrderAdded} />
            <CreateOrder onOrderAdded={handleOrderAdded} />
            <Button onClick={handleLogout}>Logout</Button>

            {/* Owner Button is only visible for owners */}
            {isOwner && (
                <Button variant="contained" color="primary" onClick={handleOpenModal}>
                    Owner Button
                </Button>
            )}

            {/* User List Modal */}
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Users List</DialogTitle>
                <DialogContent>
                    {/* Display the list of users */}
                    <UserList newUser={newUser} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Close
                    </Button>
                    <IconButton color="success" onClick={handleOpenCreateUserModal}>
                        <AddIcon />
                    </IconButton>
                </DialogActions>
            </Dialog>

            {/* Create User Modal */}
            <Dialog open={openCreateUserModal} onClose={handleCloseCreateUserModal}>
                <DialogTitle>Create New User</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        name="username"
                        value={formValues.username}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        name="password"
                        value={formValues.password}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Role</InputLabel>
                        <Select
                            value={formValues.roles[0] || ''}
                            onChange={handleRoleChange}
                            label="Role"
                            required
                        >
                            <MenuItem value="ROLE_OWNER">ROLE_OWNER</MenuItem>
                            <MenuItem value="ROLE_EMPLOYEE">ROLE_EMPLOYEE</MenuItem>
                        </Select>
                    </FormControl>
                    {formError && <Typography color="error" variant="body2">{formError}</Typography>}
                    {formSuccess && <Typography color="primary" variant="body2">{formSuccess}</Typography>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCreateUserModal} color="primary">
                        Close
                    </Button>
                    <Button onClick={handleCreateUser} color="primary">
                        Create User
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
