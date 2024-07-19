import React, { useContext, useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Snackbar, Alert, Card, CardContent, Avatar, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserContext from '../ContextAPI/UserContext';
import axios from 'axios';
import { PhotoCamera } from '@mui/icons-material';

const Profile = () => {
    const { userName, setUserName, userId, userAvatar, setUserAvatar } = useContext(UserContext); // Assuming userId and userAvatar are available in context
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!userId) {
                console.error('userId is not defined');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:5000/profile/${userId}`);
                setUserName(response.data.userName);
                setEmail(response.data.email);
                setUserAvatar(response.data.avatarUrl);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, [userId, setUserName, setUserAvatar]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('userName', userName);
            formData.append('email', email);
            if (password) {
                formData.append('password', password);
            }
            if (avatar) {
                formData.append('avatar', avatar);
            }

            await axios.post(`http://localhost:5000/profile/update/${userId}`, formData);
            setSnackbarMessage('Profile updated successfully!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            setTimeout(() => {
                window.location.reload();
            }, 2000); // Refresh the page after 2 seconds
        } catch (error) {
            console.error('Error updating profile:', error);
            setSnackbarMessage('Failed to update profile.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);

        // Preview the uploaded image
        const reader = new FileReader();
        reader.onload = () => {
            setUserAvatar(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container maxWidth="sm" sx={{ position: 'relative', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card sx={{ width: '100%', padding: 4, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom sx={{ marginBottom: 2, color: '#3f51b5', textAlign: 'center' }}>
                        Profile
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 2}}>
                        <Avatar src={userAvatar ? `http://localhost:5000${userAvatar}` : ''} alt={userName} sx={{ width: 100, height: 100, mb: 2 }} />
                        
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="avatar-upload"
                            type="file"
                            onChange={handleAvatarChange}
                        />
                        <label htmlFor="avatar-upload">
                            <IconButton color="primary" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                    </Box>
                    <form onSubmit={handleProfileUpdate} encType="multipart/form-data">
                        <TextField
                            label="User Name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                            required
                            type="email"
                        />
                        <TextField
                            label="Password"
                            type="password"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                            autoComplete="current-password" 
                        />

                        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2, width: '100%' }}>
                            Update Profile
                        </Button>
                    </form>
                    <Button variant="outlined" color="secondary" onClick={() => navigate('/dashboard')} sx={{ mt: 2, width: '100%' }}>
                        Back to Dashboard
                    </Button>
                </CardContent>
            </Card>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Profile;
