import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    // State for form fields
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Handle input changes
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission

        // Create form data object
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        // Send form data with fetch
        fetch('/login', {
            method: 'POST',
            body: formData, // Send form data as the request body
        })
            .then((response) => response.json()) // Handle the JSON response from the server
            .then((data) => console.log('Success:', data)) // Log success
            .catch(() =>  navigate("/catering")); // Handle error

    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" gutterBottom>
                Login Form
            </Typography>

            <form onSubmit={handleSubmit}>
                {/* Username Input */}
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                />

                {/* Password Input */}
                <TextField
                    label="Password"
                    type="password" // Mask the password input
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Submit
                </Button>
            </form>
        </Container>
    );
};

export default LoginPage;
