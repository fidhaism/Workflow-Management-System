// routes.js
const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('./db');

const router = express.Router();

// 
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user with hashed password
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Registration error:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Unknown user' });
      }
  
      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Incorrect password' });
      }
  
      res.json({ message: 'Login successful', name: user.name }); // Include user's name in the response
    } catch (error) {
      console.error('Login error:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

module.exports = router;
