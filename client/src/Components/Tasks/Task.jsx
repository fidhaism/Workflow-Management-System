import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Typography, Button, Grid, Card, CardContent, IconButton, Fab, Box, Modal, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const theme = createTheme();

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.priority.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (task) => {
    setSelectedTask(task);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant="h4" sx={{ marginBottom: 2, color: '#3f51b5', textAlign: 'center' }}>
          Tasks
        </Typography>

        <TextField
          label="Search Tasks"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ marginBottom: 2 }}
        />

        <Grid container spacing={3}>
          {Array.isArray(filteredTasks) && filteredTasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task._id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 3,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 5,
                  },
                }}
              >
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img src={task.image} alt="Task Image" style={{ maxWidth: '100%', maxHeight: '150px' }} />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {task.name}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Priority:</strong> {task.priority}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}
                  </Typography>
                  {task.assignedUser && (
                    <Typography variant="body1" gutterBottom>
                      <strong>Assigned User:</strong> {task.assignedUser.name}
                    </Typography>
                  )}
                  <Typography variant="body1" gutterBottom>
                    <strong>Status:</strong> {task.status}
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                  <IconButton aria-label="View" onClick={() => handleOpenModal(task)} sx={{ color: '#3f51b5' }}>
                    <VisibilityIcon />
                  </IconButton>
                  <Link to={`/tasks/${task._id}/edit`} state={{ task }}>
                    <IconButton aria-label="Edit" sx={{ color: '#fbc02d' }}>
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton aria-label="Delete" onClick={() => handleDelete(task._id)} sx={{ color: '#e53935' }}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Fab color="primary" aria-label="add" sx={{ position: 'fixed', top: '110px', right: '20px' }} component={Link} to="/tasks/add">
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
            {selectedTask && (
              <>
                <Typography variant="h4" sx={{ marginBottom: 2, color: '#3f51b5' }}>
                  Task Details
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  <strong>Task ID:</strong> {selectedTask.task_id}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  <strong>Project ID:</strong> {selectedTask.project_id ? selectedTask.project_id.project_id : 'N/A'}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  <strong>Name:</strong> {selectedTask.name}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  <strong>Priority:</strong> {selectedTask.priority}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  <strong>Deadline:</strong> {new Date(selectedTask.deadline).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  <strong>Status:</strong> {selectedTask.status}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  <strong>Description:</strong> {selectedTask.description}
                </Typography>
              </>
            )}
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
};

export default Task;
