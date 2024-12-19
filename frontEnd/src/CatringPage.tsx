import React, { useState, useEffect } from 'react';
import { Button, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, IconButton, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CreateProduct from './CreateProduct'; // Assuming this component exists
import OrderList from './OrderList'; // Assuming this component exists
import CreateOrder from './CreateOrder'; // Assuming this component exists
import UserList from './UserList'; // Assuming this component exists
import AddIcon from '@mui/icons-material/Add'; // Green plus icon

export default function CateringPage() {
    const [refreshOrders, setRefreshOrders] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false); // State to control the user list modal visibility
    const [openCreateUserModal, setOpenCreateUserModal] = useState(false); // State to control the create user modal
    const [newUser, setNewUser] = useState({
        username: '',
        password: '',
        roles: [] // Array to hold the selected roles
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
            credentials: 'include', // Include cookies (session management)
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(() => navigate("/"));
    };

    const handleOpenModal = () => {
        setOpenModal(true); // Open the user list modal
    };

    const handleCloseModal = () => {
        setOpenModal(false); // Close the user list modal
    };

    const handleOpenCreateUserModal = () => {
        setOpenCreateUserModal(true); // Open the create user modal
    };

    const handleCloseCreateUserModal = () => {
        setOpenCreateUserModal(false); // Close the create user modal
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    // Handle role selection change
    const handleRoleChange = (event) => {
        const { value } = event.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            roles: [value], // Since the backend expects an array, we store the role as an array
        }));
    };

    // Submit the form to create a new user
    const handleCreateUser = async () => {
        setFormError('');
        setFormSuccess('');

        // Basic validation
        if (!newUser.username || !newUser.password || !newUser.roles.length) {
            setFormError('Username, password, and role are required');
            return;
        }

        try {
            const response = await fetch('/api/v1/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: newUser.username,
                    password: newUser.password,
                    roles: newUser.roles // Send the roles as an array
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create user');
            }

            setFormSuccess('User created successfully');
            setNewUser({ username: '', password: '', roles: [] }); // Clear form after successful submission
            handleCloseCreateUserModal(); // Close the create user modal
        } catch (err) {
            setFormError(err.message);
        }
    };

    const addNewUser = (user) => {
        setNewUser(user);  // Update state with the new user
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
                        value={newUser.username}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        name="password"
                        value={newUser.password}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Role</InputLabel>
                        <Select
                            value={newUser.roles[0] || ''}
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
