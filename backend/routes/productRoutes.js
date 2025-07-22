














// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');
const fetchuser = require('../middleware/fetchuser');

// --- Image Upload Configuration ---
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// --- ROUTE 1: Create a New Product (SECURED) ---
router.post('/', fetchuser, upload.single('image'), async (req, res) => {
    try {
        const { fishName, quantity, price, location, description, freshness } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
        const newProduct = new Product({
            fishName,
            quantity,
            price,
            location,
            description,
            freshness,
            imageUrl,
            fishermanId: req.user.id
        });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Server error while creating product.' });
    }
});

// --- ROUTE 2: Get Logged-in User's Products (SECURED) ---
router.get('/my-listings', fetchuser, async (req, res) => {
    try {
        const products = await Product.find({ fishermanId: req.user.id }).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        console.error("Error fetching user's products:", error);
        res.status(500).json({ message: 'Server error while fetching products.' });
    }
});

// --- ROUTE 3: Get All Products (PUBLIC) ---
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        console.error('Error fetching all products:', error);
        res.status(500).json({ message: 'Server error while fetching products.' });
    }
});

module.exports = router;