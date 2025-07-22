





// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ✅ It will now ONLY use the secret from your .env file
const JWT_SECRET = process.env.JWT_SECRET;

// --- User Registration Route ---
router.post('/register', async (req, res) => {
    // ... (Your registration logic is correct, no changes needed here)
});

// --- User Login Route ---
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter both email and password.' });
    }

    // ✅ Added a check to ensure the secret key is loaded
    if (!JWT_SECRET) {
        return res.status(500).json({ message: 'Server error: JWT_SECRET is not configured.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }
        const payload = {
            user: {
                id: user.id,
                name: user.name,
                role: user.role
            }
        };
        jwt.sign(
            payload,
            JWT_SECRET, // Use the variable defined at the top
            { expiresIn: '3h' },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: { name: user.name, role: user.role }
                });
            }
        );
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error during login.' });
    }
});

module.exports = router;
