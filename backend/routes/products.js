

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth'); // Your existing auth middleware
const Product = require('../models/Product'); // Your existing Product model

// --- Multer Configuration (Unchanged) ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// --- POST Route (Slightly Adjusted for better error reporting) ---
router.post('/', [auth, upload.single('image')], async (req, res) => {
    const { fishName, quantity, price, location, description, freshness } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: 'Image for the catch is required.' });
    }
    if (!fishName || !quantity || !price || !location) {
        return res.status(400).json({ message: 'Please fill all required fields.' });
    }

    try {
        const newProduct = new Product({
            fishName,
            quantity: parseFloat(quantity),
            price: parseFloat(price),
            location,
            description,
            freshness,
            imageUrl: `/${req.file.path.replace(/\\/g, '/')}`,
            fisherman: req.user.id,
        });

        const product = await newProduct.save();
        res.status(201).json(product);
    } catch (err) {
        console.error('SERVER ERROR - ADDING PRODUCT:', err.message);
        // Send a more specific server error message
        res.status(500).json({ message: 'A server error occurred. Please try again later.' });
    }
});

module.exports = router;
