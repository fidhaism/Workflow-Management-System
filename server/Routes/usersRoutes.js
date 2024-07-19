const express = require('express');
const router = express.Router();
const { User } = require('../db'); // Adjust the path as necessary

// Fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, 'name'); // Adjust as needed, here we fetch only the 'name' field
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

module.exports = router;
