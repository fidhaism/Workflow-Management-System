const express = require('express');
const router = express.Router();
const { User } = require('../db'); // Import the User model
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  try {
    const { name, email, password, role, avatar } = req.body;

    // Validate required fields
    if (!name || !email || !password || !role || !avatar) {
      return res.status(400).json({ message: 'Please provide name, email, password, and role.' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword, role,avatar, });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Registration failed:', error.message);
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
});

module.exports = router;