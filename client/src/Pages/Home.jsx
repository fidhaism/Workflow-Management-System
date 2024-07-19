import React, { useState } from 'react';
import { Typography, Button, Grid, Container, Card, CardContent } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions'; // Import DialogActions
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';

const Home = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div style={{ backgroundColor: '#f5f5f5' }}>
        {/* Hero unit */}
        <Container maxWidth="md" style={{ padding: '4rem 0' }}>
          <Typography variant="h3" align="center" color="primary" gutterBottom>
            Welcome to Your Workflow Application
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary">
            Streamline your workflow and boost productivity with our powerful tools.
          </Typography>
          <Grid container spacing={2} justifyContent="center" style={{ marginTop: '2rem' }}>
            <Grid item>
              {/* Watch Video Button */}
              <Button variant="outlined" color="primary" onClick={handleOpen}>
                Watch Video
              </Button>
            </Grid>
            <Grid item>
              {/* Get Started Button - Redirects to Login Page */}
              <Button variant="contained" color="primary" component={Link} to="/login">
                Get Started
              </Button>
            </Grid>
          </Grid>
        </Container>
        {/* End hero unit */}
      </div>

      {/* Video Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle>YouTube Video</DialogTitle>
        <DialogContent>
          <iframe 
            width="100%" 
            height="315" 
            src="https://www.youtube.com/embed/6NI-RitPOnE?si=YmIlZ9lYGmaeQPNS&autoplay=1" // Add autoplay parameter
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </DialogContent>
        {/* Close Button */}
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="md" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Card elevation={3} style={{ height: '100%' }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2" color="primary">
                  Task Management
                </Typography>
                <Typography variant="body2">
                  Keep track of your tasks, set deadlines, assign tasks to team members, and stay organized.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card elevation={3} style={{ height: '100%' }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2" color="primary">
                  Project Collaboration
                </Typography>
                <Typography variant="body2">
                  Collaborate seamlessly with your team members, share files, and manage project milestones.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      {/* Footer */}
      <Footer />
      {/* End footer */}
    </React.Fragment>
  );
}

export default Home;
