const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Catch = require('../models/Catch');

// POST /api/products
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const {
            fishName,
            quantity,
            price,
            location,
            description,
            freshness
        } = req.body;

        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

        const newCatch = new Catch({
            fishName,
            quantity,
            price,
            location,
            description,
            freshness,
            imageUrl
        });

        await newCatch.save();

        res.status(201).json({ message: 'Catch added successfully', catch: newCatch });
    } catch (err) {
        console.error('Error saving catch:', err);
        res.status(500).json({ message: 'Server error while saving catch' });
    }
});

module.exports = router;
