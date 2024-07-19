import React, { useState, useContext } from 'react';
import { Container, Typography, TextField, Button, Link } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../ContextAPI/UserContext';

const Form = styled('form')({
  width: '100%',
  marginTop: '1rem',
});

const RootContainer = styled(Container)({
  marginTop: '8rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const SubmitButton = styled(Button)({
  margin: '3rem 0 2rem',
});

const Login = () => {
  const { setUserName, setUserId } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
  
    console.log('Submitting login form with email:', email);
  
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      console.log('Login response:', response.data);
  
      // Update username and userId in context upon successful login
      setUserName(response.data.userName);
      setUserId(response.data.userId); // Ensure userId is returned from the backend
      // Redirect to the dashboard upon successful login
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error.message);
      // Display error message based on response status
      if (error.response && error.response.status === 401) {
        setError('Incorrect email or password.');
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };
  

  return (
    <RootContainer component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <SubmitButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Sign In
        </SubmitButton>
        <Typography variant="body2" align="center">
          Don't have an account? <Link href="/register">Sign Up</Link>
        </Typography>
        {error && <Typography variant="body2" color="error">{error}</Typography>}
      </Form>
    </RootContainer>
  );
};

export default Login;
