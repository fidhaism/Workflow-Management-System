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
    primary: blue,
    secondary: green,
    warning: amber,
  },
});

function AddTask() {
  const [task_id, setTask_id] = useState('');
  const [image, setImage] = useState('');
  const [project_id, setProject_id] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [assigned_user, setAssigned_user] = useState('');
  const [status, setStatus] = useState('In Progress');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users'); // Ensure this URL is correct
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchLastTaskId = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tasks/lastId');
        const lastTaskId = response.data.lastTaskId;
        // Increment lastTaskId and set it as the next task_id
        setTask_id(`T${(parseInt(lastTaskId.substr(1)) + 1).toString().padStart(3, '0')}`);
      } catch (error) {
        console.error('Error fetching last task ID:', error);
      }
    };

    fetchProjects();
    fetchUsers();
    fetchLastTaskId();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const taskData = {
      task_id,
      image,
      project_id,
      name,
      description,
      deadline,
      priority,
      assigned_user,
      status,
    };
    console.log('Task data:', taskData); // Log the data before sending
    try {
      const response = await axios.post('http://localhost:5000/tasks', taskData); // Ensure this URL is correct
      console.log('Response data:', response.data);
      setProject_id('');
      setName('');
      setDescription('');
      setDeadline('');
      setPriority('Medium');
      setAssigned_user('');
      setStatus('In Progress');
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false); // Hide the success alert after some time
      }, 3000); // Hide after 3 seconds
    } catch (error) {
      console.error('Error adding task:', error);
      setError(true);
    }
  };



  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box p={4}>
          <Typography variant="h4" gutterBottom>
            Add Task
          </Typography>
          {success && (
            <Alert severity="success">Task added successfully!</Alert>
          )}
          {error && (
            <Alert severity="error">Error adding task!</Alert>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Task ID"
                variant="outlined"
                value={task_id}
                disabled // Disable editing of task_id field
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Image URL"
                variant="outlined"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Project"
                variant="outlined"
                value={project_id}
                onChange={(e) => setProject_id(e.target.value)}
              >
                {projects.map((project) => (
                  <MenuItem key={project._id} value={project._id}>
                    {project.project_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
                label="Deadline"
                type="date"
                variant="outlined"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Priority"
                variant="outlined"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Assigned User"
                variant="outlined"
                value={assigned_user}
                onChange={(e) => setAssigned_user(e.target.value)}
              >
                {users.map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.name}
                  </MenuItem>
                ))}
              </TextField>
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
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Box mt={3} display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={handleAdd}>
              Add
            </Button>
          </Box>
        </Box>

        {/* Back to Tasks Page button */}
        <Box mt={3}>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/tasks"
            startIcon={<ArrowBackIcon />}
          >
            Back to Tasks
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default AddTask;
