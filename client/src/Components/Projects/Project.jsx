import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, IconButton, Fab, TextField } from '@mui/material'; // Import TextField here
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [manager, setManager] = useState(null);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleOpenModal = async (project) => {
    setSelectedProject(project);
    setOpenModal(true);
    try {
      const response = await axios.get(`http://localhost:5000/managers/${project.manager_id}`);
      const managerData = response.data.manager; // Access the manager object from the response data
      setManager(managerData); // Update the manager state with the manager object
    } catch (error) {
      console.error('Error fetching manager details:', error);
    }
  };


  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDelete = async (projectId) => {
    try {
      await axios.delete(`http://localhost:5000/projects/${projectId}`);
      setProjects(projects.filter((project) => project._id !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  // Function to handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to filter projects based on search query
  const filteredProjects = projects.filter(project =>
    project.project_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" sx={{ marginBottom: 2, color: '#3f51b5', textAlign: 'center' }}>
        Projects
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search Projects"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ marginBottom: 2 }}
      />

      <Grid container spacing={3}>
        {filteredProjects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project._id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                bgcolor: 'background.paper',
                boxShadow: 3,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {project.project_name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Status:</strong> {project.status}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Due Date:</strong> {new Date(project.end_date).toLocaleDateString()}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                  <IconButton aria-label="View" onClick={() => handleOpenModal(project)} sx={{ color: '#3f51b5' }}>
                    <VisibilityIcon />
                  </IconButton>
                  <Link to={`/edit-project/${project.project_id}`} state={{ project }}>
                    <IconButton aria-label="Edit" sx={{ color: '#fbc02d' }}>
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton aria-label="Delete" onClick={() => handleDelete(project._id)} sx={{ color: '#e53935' }}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Fab color="primary" aria-label="add" sx={{ position: 'fixed', top: '110px', right: '20px' }} component={Link} to="/add-project">
        <AddIcon />
      </Fab>

      <Box sx={{ position: 'fixed', bottom: '20px', right: '20px' }}>
        <Button component={Link} to="/dashboard" variant="contained" color="primary" startIcon={<ArrowBackIcon />}>
          Back to Dashboard
        </Button>
      </Box>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            maxWidth: '90vw',
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4,
          }}
        >
          <IconButton sx={{ position: 'absolute', top: 8, right: 8 }} onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
          {selectedProject && (
            <>
              <Typography variant="h4" sx={{ marginBottom: 2, color: '#3f51b5' }}>
                Project Details
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Project ID:</strong> {selectedProject.project_id}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Project Name:</strong> {selectedProject.project_name}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Description:</strong> {selectedProject.description}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Start Date:</strong> {new Date(selectedProject.start_date).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>End Date:</strong> {new Date(selectedProject.end_date).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Status:</strong> {selectedProject.status}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Manager:</strong> {manager ? manager.name : 'N/A'}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default Project;
