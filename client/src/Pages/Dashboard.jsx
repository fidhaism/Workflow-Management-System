import React, { useContext, useState, useEffect } from 'react';
import {
  Drawer, List, ListItem, ListItemText, Divider, Toolbar, Typography, Container, Grid, Button, Card, CardContent, Modal, Box, Avatar
} from '@mui/material';
import { styled } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../ContextAPI/UserContext';

// Styled Container to set background image
const BackgroundContainer = styled(Container)({
  backgroundImage: `url("https://i.pinimg.com/originals/ea/db/74/eadb74787dda41cc6333341e55293432.gif")`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  height: '100vh',
});

const DrawerContainer = styled('div')({
  width: 270,
  flexShrink: 0, // Prevents the drawer from shrinking.
  borderRight: '4px solid #332D2D', // Example border color
  display: 'flex',
  flexDirection: 'column', // Arranges children elements in a column.
  height: '100vh',
  backgroundColor: '#212529', // Example dark color
  color: 'limegreen', // Set text color to white
  
});


const ContentContainer = styled(Container)(({ theme }) => ({
  flexGrow: 1,
  marginTop: '20px',
}));

const StatsCard = styled(Card)({
  transition: 'transform 0.5s ease-in-out',
  '&:hover': {
    transform: 'scale(1.08)', // Increase the size of the card on hover
  },
  backgroundColor: '#333', // Dark background color
});

const AlertModal = ({ open, onClose, onConfirm }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'white',
          boxShadow: 24,
          borderRadius: '8px',
          p: 4,
          minWidth: '300px',
          maxWidth: '400px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Are you sure you want to log out?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button onClick={onConfirm} color="primary" sx={{ mr: 2 }}>
            Yes
          </Button>
          <Button onClick={onClose} color="secondary">
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const Dashboard = () => {
  const { userName, setUserName, userAvatar } = useContext(UserContext);
  console.log('User avatar:', userAvatar);
  const navigate = useNavigate();
  const [logoutAlertOpen, setLogoutAlertOpen] = useState(false);
  const [stats, setStats] = useState({
    adminCount: 0,
    managementCount: 0,
    employeeCount: 0,
    projectCount: 0,
    pendingProjectCount: 0,
    completedProjectCount: 0,
  });
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const fetchStats = async () => {
    try {
      const userResponse = await axios.get('http://localhost:5000/stats/users');
      const projectResponse = await axios.get('http://localhost:5000/stats/projects');

      setStats({
        adminCount: userResponse.data.adminCount,
        managementCount: userResponse.data.managementCount,
        employeeCount: userResponse.data.employeeCount,
        projectCount: projectResponse.data.projectCount,
        pendingProjectCount: projectResponse.data.pendingProjectCount,
        completedProjectCount: projectResponse.data.completedProjectCount,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    setLogoutAlertOpen(true);
  };

  const handleLogoutConfirm = () => {
    setLogoutAlertOpen(false);
    navigate('/');
  };

  const handleLogoutCancel = () => {
    setLogoutAlertOpen(false);
  };

  const recentActivities = [
    { id: 1, user: 'Admin', activity: 'Created a new project' },
    { id: 2, user: 'Employee', activity: 'Completed task T002' },
    { id: 3, user: 'Admin', activity: 'Reviewed project ' },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <DrawerContainer>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Dashboard
          </Typography>
        </Toolbar>
        <Divider />
        {/* <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
          <Avatar src={userAvatar} alt="img not found" sx={{ width: 80, height: 80, mb: 2 }} />
          <Typography variant="h6" sx={{ color: 'whitesmoke' }}>
            {userName}
          </Typography>
        </Box> */}
        <List>
          <ListItem button component={Link} to="/project">
            <ListItemText primary="Project" />
          </ListItem>
          <ListItem button component={Link} to="/tasks">
            <ListItemText primary="Task" />
          </ListItem>
        </List>
        <ListItem button component={Link} to="/profile">
          <ListItemText primary="Profile" />
        </ListItem>
        <Divider />
        <Button variant="outlined" color="inherit" onClick={handleLogout} sx={{ marginBottom: '20px' }}>
          Logout
        </Button>
      </DrawerContainer>

      <ContentContainer>
        <BackgroundContainer>
          <Grid item xs={9}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '100%', // Adjusted to fill full page height
                backgroundColor: '', // Background color
                color: 'white', // Text color
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', flexGrow: 1 }}>
                Welcome, <span style={{ color: 'red' }}>{userName}</span>
              </Typography>
              <Typography variant="h6" sx={{ marginLeft: 'auto' }}>
                {currentDateTime.toLocaleString()}
              </Typography>
            </Box>
          </Grid>
          <br />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <StatsCard>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Admins
                    </Typography>
                    <Typography variant="h4">{stats.adminCount}</Typography>
                  </CardContent>
                </Card>
              </StatsCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatsCard>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Managers
                    </Typography>
                    <Typography variant="h4">{stats.managementCount}</Typography>
                  </CardContent>
                </Card>
              </StatsCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatsCard>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Employees
                    </Typography>
                    <Typography variant="h4">{stats.employeeCount}</Typography>
                  </CardContent>
                </Card>
              </StatsCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatsCard>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Projects
                    </Typography>
                    <Typography variant="h4">{stats.projectCount}</Typography>
                  </CardContent>
                </Card>
              </StatsCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatsCard>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Pending Projects
                    </Typography>
                    <Typography variant="h4">{stats.pendingProjectCount}</Typography>
                  </CardContent>
                </Card>
              </StatsCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatsCard>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Completed Projects
                    </Typography>
                    <Typography variant="h4">{stats.completedProjectCount}</Typography>
                  </CardContent>
                </Card>
              </StatsCard>
            </Grid>
          </Grid>

          <Grid item xs={9}>
            <br />
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <List>
              {recentActivities.map((activity) => (
                <ListItem key={activity.id}>
                  <ListItemText primary={`${activity.user}: ${activity.activity}`} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </BackgroundContainer>
      </ContentContainer>

      <AlertModal open={logoutAlertOpen} onClose={handleLogoutCancel} onConfirm={handleLogoutConfirm} />
    </div>
  );
};

export default Dashboard;
