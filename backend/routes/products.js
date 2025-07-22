// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const auth = require('../middleware/auth'); // Security middleware
// const Product = require('../models/Product'); // Database model

// // --- Multer Configuration for Image Upload ---
// // This sets up where to store uploaded files and how to name them.
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // The folder where images will be saved
//     },
//     filename: function (req, file, cb) {
//         // Creates a unique filename (e.g., image-1678886400000.jpg)
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });

// /**
//  * @route   POST api/products
//  * @desc    Add a new fish catch (product) from the AddCatchForm
//  * @access  Private (Requires authentication)
//  */
// // The middleware runs in order:
// // 1. `auth`: Verifies the user's token.
// // 2. `upload.single('image')`: Processes the file uploaded with the field name 'image'.
// router.post('/', [auth, upload.single('image')], async (req, res) => {
//     // Text fields from the form are in `req.body`
//     const { fishName, quantity, price, location, description, freshness } = req.body;
    
//     // The uploaded file's info is in `req.file`
//     if (!req.file) {
//         return res.status(400).json({ message: 'An image for the catch is required.' });
//     }

//     try {
//         const newProduct = new Product({
//             fishName,
//             quantity: parseFloat(quantity),
//             price: parseFloat(price),
//             location,
//             description,
//             freshness,
//             // The URL path to the saved image
//             imageUrl: `/${req.file.path.replace(/\\/g, '/')}`, 
//             // The user's ID, which was added to the request by the `auth` middleware
//             fisherman: req.user.id, 
//         });

//         const product = await newProduct.save();

//         // Send back the newly created product with a 201 "Created" status
//         res.status(201).json(product);

//     } catch (err) {
//         console.error('Error adding product:', err.message);
//         res.status(500).send('Server Error');
//     }
// });


// module.exports = router;






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
