import React from "react";
import { Box, Typography, TextField, Button, Link, Divider, Snackbar, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useUserStore } from "../store/user";
import { useState } from "react";


const Authentication = () => {
    const { registerUser, loginUser } = useUserStore();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [newUser, setNewUser] = useState({
        text: "",
        img: "",
    });

    const handleRegister = async () => {
        const { success, message } = await registerUser(newUser);
        setSnackbarMessage(message);
        setSnackbarOpen(true);
        if (success) {
            setNewUser({ text: "", img: "" });
        }
    };
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarOpen(false);
    };

    const handleLogin = async () => {
        const credentials = {
            email: newUser.email,
            password: newUser.password,
        };
        const { success, message } = await loginUser(credentials);
        setSnackbarMessage(message);
        setSnackbarOpen(true);
        if (success) {
            setNewUser({ email: "", password: "" });
            // Additional logic can be added here, such as navigation to a dashboard
        }
    }
    return (

        <Box 
            sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#f0f2f5', // Light gray background similar to Facebook
            padding: 2,
            }}
        >
            {/* Logo Section */}
            <Box
                sx={{
                marginBottom: 2,
                textAlign: 'center',
                }}
            >
                <Typography
                variant="h1"
                sx={{
                    color: '#1877f2', // Facebook blue
                    fontWeight: 'bold',
                    fontSize: { xs: '2rem', md: '3rem' }, // Responsive font size
                }}
                >
                facebook
                </Typography>
                <Typography
                variant="h5"
                sx={{
                    color: '#1c1e21',
                    maxWidth: '500px',
                    marginTop: 1,
                    fontSize: { xs: '1rem', md: '1.5rem' },
                }}
                >
                Connect with friends and the world around you on Facebook.
                </Typography>
            </Box>

            {/* Login Form */}
            <Box
                sx={{
                backgroundColor: '#ffffff',
                borderRadius: 1,
                boxShadow: 1,
                padding: 3,
                width: { xs: '100%', sm: '400px' }, // Responsive width
                textAlign: 'center',
                }}
            >
                <TextField
                fullWidth
                value={newUser.email} 
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value})} 
                label="Email or phone number"
                variant="outlined"
                margin="normal"
                sx={{ marginBottom: 2 }}
                />
                <TextField
                fullWidth
                value={newUser.password} 
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value})} 
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                sx={{ marginBottom: 2 }}
                />
                <Button
                fullWidth
                variant="contained"
                onClick={handleLogin}
                sx={{
                    backgroundColor: '#1877f2',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    padding: 1.5,
                    marginBottom: 2,
                    '&:hover': { backgroundColor: '#166fe5' },
                }}
                >
                Log In
                </Button>
                <Link
                href="#"
                underline="hover"
                sx={{
                    color: '#1877f2',
                    fontSize: '0.875rem',
                    marginBottom: 2,
                    display: 'block',
                }}
                >
                Forgot password?
                </Link>
                <Divider sx={{ marginY: 2 }}>or</Divider>
                <Button
                fullWidth
                variant="contained"
                sx={{
                    backgroundColor: '#42b72a', // Green for create account, similar to Facebook
                    color: '#ffffff',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    padding: 1.5,
                    '&:hover': { backgroundColor: '#36a420' },
                }}
                >
                Create new account
                </Button>
            </Box>
            <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
            action={
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            }
            />
            {/* Footer Links (Optional, mimicking Facebook's footer) */}
            <Box sx={{ marginTop: 4, textAlign: 'center', color: '#8a8d91', fontSize: '0.75rem' }}>
                <Link href="#" underline="hover" sx={{ color: '#8a8d91', marginX: 1 }}>Sign Up</Link>
                <Link href="#" underline="hover" sx={{ color: '#8a8d91', marginX: 1 }}>Log In</Link>
                <Link href="#" underline="hover" sx={{ color: '#8a8d91', marginX: 1 }}>Messenger</Link>
                {/* Add more links as needed */}
            </Box>
        </Box>
    )
}

export default Authentication;