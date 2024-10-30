// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        res.json({ message: 'User registered', user });
    } catch (error) {
        res.status(400).json({ error: 'Error registering user' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    console.log(req.body);
    
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        console.log(user);
        
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(400).json({ error: 'Error logging in' });
    }
});

// Fetch all users route
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, 'username email'); // Only return username and email fields
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
});

module.exports = router;
