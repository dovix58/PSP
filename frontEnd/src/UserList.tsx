import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Typography,
    Button
} from "@mui/material";

const UsersList = ({ newUser }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch users from backend
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("/api/v1/users"); // Replace with your backend API endpoint
                const data = await response.json();
                setUsers(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Add new user to the table
    useEffect(() => {
        if (newUser) {
            setUsers((prevUsers) => [...prevUsers, newUser]);
        }
    }, [newUser]);

    // Delete user function
    const handleDeleteUser = async (username) => {
        try {
            const response = await fetch(`/api/v1/users/${username}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete user");
            }

            // Update the user list after successful deletion
            setUsers((prevUsers) => prevUsers.filter((user) => user.username !== username));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <CircularProgress />
                <Typography variant="h6" style={{ marginTop: "10px" }}>
                    Loading users...
                </Typography>
            </div>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => handleDeleteUser(user.username)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UsersList;
