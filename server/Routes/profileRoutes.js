const express = require('express');
const multerConfig = require('../Middlewares/multerMiddleware');
const path = require('path');
const bcrypt = require('bcrypt');
const { User } = require('../db');
const router = express.Router();



// Endpoint to get user profile
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ userName: user.name, email: user.email, avatarUrl: user.avatarUrl });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Endpoint to update user profile
router.post('/update/:id', multerConfig.single('avatar'), async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const updateData = { name: userName, email };

        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        if (req.file) {
            updateData.avatarUrl = `/uploads/${req.file.filename}`;
        }

        const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'Profile updated successfully!', user: { ...user, avatarUrl: `/uploads/${req.file.filename}` } });
        // res.json({ message: 'Profile updated successfully!', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
