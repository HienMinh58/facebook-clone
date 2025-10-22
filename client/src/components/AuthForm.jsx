import React, { useState } from 'react';
import { Box, TextField, Button, Link, Divider, Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useUserStore } from '../store/user';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ mode = 'login', fields, onSubmitSuccess, submitButtonText, secondaryButtonText, secondaryAction }) => {
    const { loginUser, registerUser } = useUserStore();
    const [formData, setFormData] = useState(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (mode === 'register') {
        const requiredFields = ['username', 'email', 'password', 'confirmPassword'];
        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            setSnackbarMessage('All fields are required.');
            setSnackbarOpen(true);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setSnackbarMessage('Passwords do not match.');
            setSnackbarOpen(true);
            return;
        }
        }
        const apiCall = mode === 'login' ? loginUser : registerUser;
        const { success, message } = await apiCall(formData);
        setSnackbarMessage(message);
        setSnackbarOpen(true);
        if (success) {
            setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
            if (onSubmitSuccess) onSubmitSuccess(navigate); // e.g., redirect to dashboard
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarOpen(false);
    };
  return (
        <Box
            sx={{
                backgroundColor: '#ffffff',
                borderRadius: 1,
                boxShadow: 1,
                padding: 3,
                width: { xs: '100%', sm: '400px' },
                textAlign: 'center',
            }}
        >
            {fields.map((field) => (
                <TextField
                    key={field.name}
                    fullWidth
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    label={field.label}
                    type={field.type || 'text'}
                    variant="outlined"
                    margin="normal"
                    sx={{ marginBottom: 2 }}
                />
            ))}
            <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                sx={{
                    backgroundColor: mode === 'login' ? '#1877f2' : '#42b72a',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    padding: 1.5,
                    marginBottom: 2,
                    '&:hover': { backgroundColor: mode === 'login' ? '#166fe5' : '#36a420' },
                }}
            >
                {submitButtonText}
            </Button>
            {mode === 'login' && (
                <Link href="#" underline="hover" sx={{ color: '#1877f2', fontSize: '0.875rem', marginBottom: 2, display: 'block' }}>
                    Forgot password?
                </Link>
            )}
            <Divider sx={{ marginY: 2 }}>or</Divider>
            <Button
                fullWidth
                variant="contained"
                onClick={secondaryAction}
                sx={{
                    backgroundColor: mode === 'login' ? '#42b72a' : '#1877f2',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    padding: 1.5,
                    '&:hover': { backgroundColor: mode === 'login' ? '#36a420' : '#166fe5' },
                }}
            >
                {secondaryButtonText}
            </Button>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
                action={<IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}><CloseIcon fontSize="small" /></IconButton>}
            />
        </Box>
  )
}

export default AuthForm
