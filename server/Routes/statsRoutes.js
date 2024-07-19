const express = require('express'); // Import the express library
const router = express.Router(); // Create a new router instance using express
const { User, Project } = require('../db'); // Import the User and Project models from the database

// Route to get user statistics
router.get('/users', async (req, res) => {
  try {
    // Count the number of users with each role
    const adminCount = await User.countDocuments({ role: 'admin' });
    const managementCount = await User.countDocuments({ role: 'management' });
    const employeeCount = await User.countDocuments({ role: 'employee' });

    // Send the user statistics as a JSON response
    res.json({
      adminCount,
      managementCount,
      employeeCount,
    });
  } catch (error) {
    // If an error occurs during the process, log the error and send a 500 Internal Server Error status with an error message
    console.error('Error getting user statistics:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to get project statistics
router.get('/projects', async (req, res) => {
  try {
    // Count the total number of projects and projects with status 'Pending' and 'Completed'
    const projectCount = await Project.countDocuments();
    const pendingProjectCount = await Project.countDocuments({ status: 'Pending' });
    const completedProjectCount = await Project.countDocuments({ status: 'Completed' });

    // Send the project statistics as a JSON response
    res.json({
      projectCount,
      pendingProjectCount,
      completedProjectCount,
    });
  } catch (error) {
    // If an error occurs during the process, log the error and send a 500 Internal Server Error status with an error message
    console.error('Error getting project statistics:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router; // Export the router to use it in other parts of the application
