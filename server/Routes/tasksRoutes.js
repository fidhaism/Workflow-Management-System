const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // Ensure mongoose is imported
const Task = require('../models/tasks'); // Ensure the path is correct

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ message: 'Error fetching tasks', error: err.message });
  }
});

// Get the last task ID
router.get('/lastId', async (req, res) => {
  try {
    const lastTask = await Task.findOne().sort({ task_id: -1 });
    res.json({ lastTaskId: lastTask ? lastTask.task_id : 'T000' });
  } catch (err) {
    console.error('Error fetching last task ID:', err);
    res.status(500).json({ message: 'Error fetching last task ID', error: err.message });
  }
});

// Get a single task by ID
router.get('/:taskId', async (req, res) => {
  try {
    const taskId = req.params.taskId;
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    console.error('Error fetching task:', err);
    res.status(500).json({ message: 'Error fetching task', error: err.message });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  try {
    console.log('Received request:', req.body); // Log the incoming request data

    const { task_id,image, project_id, name, description, deadline, priority, status } = req.body;

    const newTask = new Task({
      task_id,
      image,
      project_id,
      name,
      description,
      deadline,
      priority,
      status
    });

    console.log('New task to be saved:', newTask); // Log the task data before saving

    const savedTask = await newTask.save();
    console.log('Task saved:', savedTask); // Log the saved task

    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error creating task:', error); // Log the error
    res.status(500).json({ error: 'Error creating task' });
  }
});

// Update a task by ID
router.put('/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
});

// Delete a task by ID
router.delete('/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(deletedTask);
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
});

module.exports = router;