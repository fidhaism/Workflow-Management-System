import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Grid, MenuItem, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, green, amber } from '@mui/material/colors';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: green[500],
    },
    warning: {
      main: amber[500],
    },
  },
});

function AddProject() {
  const [project_id, setProject_id] = useState('');
  const [project_name, setProject_name] = useState('');
  const [description, setDescription] = useState('');
  const [start_date, setStart_date] = useState('');
  const [end_date, setEnd_date] = useState('');
  const [status, setStatus] = useState('In Progress');
  const [manager_id, setManager_id] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [dateError, setDateError] = useState('');
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/managers');
        setManagers(response.data.managers);
      } catch (error) {
        console.error('Error fetching managers:', error);
      }
    };

    const fetchLastProjectId = async () => {
      try {
        const response = await axios.get('http://localhost:5000/projects/lastId');
        const lastProjectId = response.data.lastProjectId;
        setProject_id(`P${(parseInt(lastProjectId.substr(1)) + 1).toString().padStart(3, '0')}`);
      } catch (error) {
        console.error('Error fetching last project ID:', error);
      }
    };

    fetchManagers();
    fetchLastProjectId();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

     // Date validation
     if (new Date(end_date) < new Date(start_date)) {
      alert('End date cannot be before start date.');
      return;
    } else {
      setDateError('');
    }

    const projectData = {
      project_id,
      project_name,
      description,
      start_date,
      end_date,
      status,
      manager_id,
    };
    try {
      await axios.post('http://localhost:5000/projects', projectData);
      setProject_name('');
      setDescription('');
      setStart_date('');
      setEnd_date('');
      setStatus('In Progress');
      setManager_id('');
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        
        <Box p={4} sx={{ backgroundColor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
          <Box display="flex" justifyContent="center" mb={2}>
            <Typography variant="h4" gutterBottom>
              Add Project
            </Typography>
          </Box>

          {success && (
            <Alert severity="success">Project added successfully!</Alert>
          )}
          {error && (
            <Alert severity="error">Error adding project. Please try again.</Alert>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Project ID"
                variant="outlined"
                value={project_id}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Project Name"
                variant="outlined"
                value={project_name}
                onChange={(e) => setProject_name(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                variant="outlined"
                value={start_date}
                onChange={(e) => setStart_date(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                variant="outlined"
                value={end_date}
                onChange={(e) => setEnd_date(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Status"
                variant="outlined"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Manager"
                variant="outlined"
                value={manager_id}
                onChange={(e) => setManager_id(e.target.value)}
              >
                {managers.map((manager) => (
                  <MenuItem key={manager._id} value={manager._id}>
                    {manager.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Box mt={3} display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={handleAdd}>
              Add
            </Button>
          </Box>
        </Box>

        <Box mt={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/project"
            startIcon={<ArrowBackIcon />}
          >
            Back to Projects
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default AddProject;
