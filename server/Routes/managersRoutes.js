const express = require('express'); // Import the express library
const { User } = require('../db'); // Import the User model from the database
const router = express.Router(); // Create a new router instance using express

// Define a GET route to fetch managers
router.get('/managers', async (req, res) => {
  try {
    // Use the User model to find users with the role 'management'
    const managers = await User.find({ role: 'management' }).select('id name');

    // If successful, send the list of managers as a JSON response
    res.json({ managers });
  } catch (error) {
    // If an error occurs during the process, send a 500 Internal Server Error status with an error message
    res.status(500).json({ error: 'Error fetching managers' });
  }
});

module.exports = router; // Export the router to use it in other parts of the application
