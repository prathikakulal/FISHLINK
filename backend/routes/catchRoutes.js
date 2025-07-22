


const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const upload = require('../middleware/upload');
const Catch = require('../models/Catch');
const User = require('../models/User');

// GET /api/catches - Get all catches for browsing (Public Route)
router.get('/', async (req, res) => {
    try {
        const allCatches = await Catch.find()
            .populate('userId', 'name')
            .sort({ createdAt: -1 });
        res.json(allCatches);
    } catch (err) {
        console.error('Error fetching all catches:', err);
        res.status(500).json({ message: 'Failed to fetch catches' });
    }
});

// POST /api/catches – Upload a new catch (Protected Route)
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
    try {
        const { fishName, quantity, price, location, description, freshness } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: 'Catch image is required.' });
        }
        const newCatch = new Catch({
            userId: req.user.id,
            fishName,
            quantity,
            price,
            location,
            description,
            freshness,
            imageUrl: `/uploads/${req.file.filename}`
        });
        await newCatch.save();
        res.status(201).json({ message: 'Catch added successfully', catch: newCatch });
    } catch (err) {
        console.error('Error saving catch:', err);
        res.status(500).json({ message: 'Server error while saving catch' });
    }
});

// GET /api/catches/my-listings – Get current user's listings (Protected)
router.get('/my-listings', verifyToken, async (req, res) => {
    try {
        const listings = await Catch.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(listings);
    } catch (err) {
        console.error('Error fetching your listings:', err);
        res.status(500).json({ message: 'Failed to fetch your listings' });
    }
});

module.exports = router;
