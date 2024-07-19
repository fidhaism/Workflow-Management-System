import React, { useState } from 'react';
import { Container, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Avatar, Grid, Box } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Form = styled('form')({
  width: '100%',
  marginTop: '1rem',
});

const RootContainer = styled(Container)({
  marginTop: '4rem',
});

const AvatarContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '1rem',
});

const AvatarLabel = styled('div')({
  textAlign: 'center',
});

const SubmitButton = styled(Button)({
  margin: '1rem 0',
});

const Register = () => {
  const navigate = useNavigate();
  const [avatarPreview, setAvatarPreview] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee',
    avatar: null,
  });

  const handleAvatarChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });

    // Preview avatar image
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send registration data to the backend
      const response = await axios.post('http://localhost:5000/register', formData);
      console.log(response.data);

      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error.message);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <RootContainer maxWidth="xs">
      <Typography component="h1" variant="h5" align="center">
        Register
      </Typography>
      <AvatarContainer>
        <Avatar src={avatarPreview} sx={{ width: 100, height: 100 }} />
      </AvatarContainer>
      <AvatarLabel>
        <InputLabel htmlFor="avatar-upload">Avatar</InputLabel>
      </AvatarLabel>
      <Form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>User Role</InputLabel>
              <Select
                label="User Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="employee">Employee</MenuItem>
                <MenuItem value="management">Management</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="avatar-upload">
                <Button component="span" variant="outlined" fullWidth>
                  Choose Avatar
                </Button>
              </label>
            </FormControl>
          </Grid>
        </Grid>
        <SubmitButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Register
        </SubmitButton>
        {error && <Typography variant="body2" color="error">{error}</Typography>}
      </Form>
    </RootContainer>
  );
};

export default Register;
