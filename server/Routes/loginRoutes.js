const express = require('express');
const router = express.Router(); // Create a new router instance
const { User } = require('../db'); // Import the User model from the database
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

// Define a POST route for user login
router.post('/login', async (req, res) => {
  // Extract email and password from the request body
  const { email, password } = req.body;

  try {
    // Find a user in the database by their email
    const user = await User.findOne({ email });

    // Check if a user with the provided email exists
    if (!user) {
      // If user does not exist, return a 401 Unauthorized status with an error message
      return res.status(401).json({ message: 'Incorrect email or password.' });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the passwords do not match, return a 401 Unauthorized status with an error message
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect email or password.' });
    }

    // If the login is successful, return a 200 OK status with the user's ID and name
    res.status(200).json({ userId: user._id, userName: user.name });
  } catch (error) {
    // If an error occurs during the login process, log the error and return a 500 Internal Server Error status
    console.error('Login failed:', error.message);
    res.status(500).json({ message: 'Login failed. Please try again.' });
  }
});

module.exports = router; // Export the router to use it in other parts of the application
