import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Grid, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProject = () => {
  const location = useLocation();
  const { project } = location.state;

  const [projectDetails, setProjectDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/projects/${project._id}`);
        const projectData = response.data;
    
        // Format date strings to match the expected format
        const formattedStartDate = new Date(projectData.start_date).toISOString().split('T')[0];
        const formattedEndDate = new Date(projectData.end_date).toISOString().split('T')[0];
    
        // Update project details with formatted dates
        setProjectDetails({
          ...projectData,
          start_date: formattedStartDate,
          end_date: formattedEndDate,
        });
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    if (project) {
      fetchProjectDetails();
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectDetails({ ...projectDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/projects/${projectDetails._id}`, projectDetails);
      toast.success('Project Updated');
      navigate('/project'); // Navigate to the projects list after successful update
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('An error occurred while updating the project. Please try again later.');
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom style={{ marginTop: '20px', textAlign: 'center' }}>
        Edit Project
      </Typography>
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Image Column */}
          <Grid item xs={12} md={6}>
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/chartered-accountant-3606530-3013119.png"
              alt="Project"
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </Grid>
          {/* Form Fields Column */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Project Name"
              name="project_name"
              value={projectDetails.project_name || ''}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Description"
              name="description"
              value={projectDetails.description || ''}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              required
              margin="normal"
            />
            <TextField
              label="Start Date"
              name="start_date"
              type="date"
              value={projectDetails.start_date || ''}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="End Date"
              name="end_date"
              type="date"
              value={projectDetails.end_date || ''}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              required
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                name="status"
                value={projectDetails.status || ''}
                onChange={handleChange}
                required
              >
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
              <Button variant="contained" color="secondary" onClick={() => navigate(-1)}>
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default EditProject;
