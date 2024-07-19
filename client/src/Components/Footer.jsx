import React from 'react';
import { Typography, Container, Grid, Link } from '@mui/material';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#212121', color: '#fff', padding: '2rem 0' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" style={{ color: '#FFA500', marginBottom: '1rem' }}>About Us</Typography>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget orci vel nisi tristique vulputate.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" style={{ color: '#FF69B4', marginBottom: '1rem' }}>Contact Details</Typography>
            <Typography variant="body2">
              Email: <Link href="mailto:info@example.com" style={{ color: '#fff' }}>fidha.abdulrazack@gmail.com</Link>
            </Typography>
            <Typography variant="body2">Phone: +91 0000000000</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" style={{ color: '#00FFFF', marginBottom: '1rem' }}>Follow Us</Typography>
            <div>
              <Link href="#" style={{ marginRight: '1rem' }}><i className="fab fa-facebook-square fa-lg" style={{ color: '#3b5998' }}></i></Link>
              <Link href="#" style={{ marginRight: '1rem' }}><i className="fab fa-twitter-square fa-lg" style={{ color: '#00acee' }}></i></Link>
              <Link href="#"><i className="fab fa-instagram-square fa-lg" style={{ color: '#c13584' }}></i></Link>
            </div>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
