import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    name: '',
    image: '',
    description: '',
    deadline: '',
    priority: '',
    status: '',
  });

  const fetchTask = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/tasks/${taskId}`);
      setTask(response.data);
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/tasks/${taskId}`, task);
      navigate('/tasks');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleCancel = () => {
    navigate('/tasks');
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'center', marginTop: 4 }}>
      <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: '8px', marginTop: 2, width: '100%', maxWidth: '600px' }}>
        <Typography variant="h4" gutterBottom>Edit Task</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={task.name}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Image URL"
            name="image"
            value={task.image}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={task.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Deadline"
            name="deadline"
            type="date"
            value={task.deadline.split('T')[0]}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Priority</InputLabel>
            <Select
              label="Priority"
              name="priority"
              value={task.priority}
              onChange={handleChange}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              name="status"
              value={task.status}
              onChange={handleChange}
            >
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Button type="submit" variant="contained" color="primary">Save</Button>
            <Button variant="contained" color="secondary" onClick={handleCancel}>Cancel</Button>
          </Box>
        </form>
      </Box>
      <Box sx={{ marginTop: { xs: 2, md: 0 }, marginLeft: { md: 4 }, textAlign: 'center' }}>
        <img src="https://static.vecteezy.com/system/resources/previews/002/531/061/large_2x/task-list-illustration-vector.jpg" alt="Task List Illustration" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
      </Box>
    </Container>
  );
};

export default EditTask;
