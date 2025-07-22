// // // // // /*
// // // // //  * This file contains the API routes for managing products (fish catches).
// // // // //  * It includes logic for creating a new product with an image upload
// // // // //  * and fetching all existing products from the database.
// // // // //  */

// // // // // const express = require('express');
// // // // // const router = express.Router();
// // // // // const multer = require('multer');
// // // // // const path = require('path');
// // // // // const Product = require('../models/Product'); // Ensure this path is correct

// // // // // // --- Image Upload Configuration (using Multer) ---
// // // // // const storage = multer.diskStorage({
// // // // //     destination: function (req, file, cb) {
// // // // //         // This specifies that uploaded files will be stored in the 'uploads/' directory
// // // // //         cb(null, 'uploads/');
// // // // //     },
// // // // //     filename: function (req, file, cb) {
// // // // //         // This creates a unique filename for each uploaded image
// // // // //         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
// // // // //     }
// // // // // });

// // // // // const upload = multer({ storage: storage });

// // // // // // --- ROUTE 1: Create a New Product ---
// // // // // // Handles POST requests to /api/products
// // // // // // The `upload.single('image')` part is middleware that handles the file upload
// // // // // router.post('/', upload.single('image'), async (req, res) => {
// // // // //     const { fishName, quantity, price, location, description, freshness, fishermanId } = req.body;

// // // // //     try {
// // // // //         const newProduct = new Product({
// // // // //             fishName,
// // // // //             quantity,
// // // // //             price,
// // // // //             location,
// // // // //             description,
// // // // //             freshness,
// // // // //             fishermanId, // In a real app, you'd get this from the authenticated user's token
// // // // //             imageUrl: req.file ? `/uploads/${req.file.filename}` : '' // Save the path to the image
// // // // //         });

// // // // //         const savedProduct = await newProduct.save();
// // // // //         res.status(201).json(savedProduct);

// // // // //     } catch (error) {
// // // // //         console.error('Error creating product:', error);
// // // // //         res.status(500).json({ message: 'Server error while creating product.' });
// // // // //     }
// // // // // });

// // // // // // --- ROUTE 2: Get All Products ---
// // // // // // Handles GET requests to /api/products
// // // // // router.get('/', async (req, res) => {
// // // // //     try {
// // // // //         const products = await Product.find().sort({ createdAt: -1 }); // Get newest first
// // // // //         res.json(products);
// // // // //     } catch (error) {
// // // // //         console.error('Error fetching products:', error);
// // // // //         res.status(500).json({ message: 'Server error while fetching products.' });
// // // // //     }
// // // // // });

// // // // // module.exports = router;





// // // // /*
// // // //  * This file contains the API routes for managing products (fish catches).
// // // //  * It includes logic for creating a new product with an image upload
// // // //  * and fetching all existing products from the database.
// // // //  */

// // // // const express = require('express');
// // // // const router = express.Router();
// // // // const multer = require('multer');
// // // // const path = require('path');
// // // // const Product = require('../models/Product'); // Ensure this path is correct

// // // // // --- Image Upload Configuration (using Multer) ---
// // // // const storage = multer.diskStorage({
// // // //     destination: function (req, file, cb) {
// // // //         // This specifies that uploaded files will be stored in the 'uploads/' directory
// // // //         cb(null, 'uploads/');
// // // //     },
// // // //     filename: function (req, file, cb) {
// // // //         // This creates a unique filename for each uploaded image
// // // //         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
// // // //     }
// // // // });

// // // // const upload = multer({ storage: storage });

// // // // // --- ROUTE 1: Create a New Product ---
// // // // // Handles POST requests to /api/products
// // // // // The `upload.single('image')` part is middleware that handles the file upload
// // // // router.post('/', upload.single('image'), async (req, res) => {
// // // //     const { fishName, quantity, price, location, description, freshness, fishermanId } = req.body;

// // // //     try {
// // // //         const newProduct = new Product({
// // // //             fishName,
// // // //             quantity,
// // // //             price,
// // // //             location,
// // // //             description,
// // // //             freshness,
// // // //             fishermanId, // In a real app, you'd get this from the authenticated user's token
// // // //             imageUrl: req.file ? `/uploads/${req.file.filename}` : '' // Save the path to the image
// // // //         });

// // // //         const savedProduct = await newProduct.save();
// // // //         res.status(201).json(savedProduct);

// // // //     } catch (error) {
// // // //         console.error('Error creating product:', error);
// // // //         res.status(500).json({ message: 'Server error while creating product.' });
// // // //     }
// // // // });

// // // // // --- ROUTE 2: Get All Products ---
// // // // // Handles GET requests to /api/products
// // // // router.get('/', async (req, res) => {
// // // //     try {
// // // //         const products = await Product.find().sort({ createdAt: -1 }); // Get newest first
// // // //         res.json(products);
// // // //     } catch (error) {
// // // //         console.error('Error fetching products:', error);
// // // //         res.status(500).json({ message: 'Server error while fetching products.' });
// // // //     }
// // // // });

// // // // module.exports = router;




// // // /*
// // //  * This file contains the final, working API routes for managing products.
// // //  * It uses the 'multer' library to handle image file uploads.
// // //  */

// // // const express = require('express');
// // // const router = express.Router();
// // // const multer = require('multer');
// // // const path = require('path');
// // // const Product = require('../models/Product'); // Ensure this path is correct

// // // // --- Image Upload Configuration (using Multer) ---
// // // // This sets up where to store the uploaded images and how to name them.
// // // const storage = multer.diskStorage({
// // //     destination: function (req, file, cb) {
// // //         // The 'uploads/' folder must exist in your backend's root directory.
// // //         cb(null, 'uploads/');
// // //     },
// // //     filename: function (req, file, cb) {
// // //         // Creates a unique filename like 'image-1678886400000.jpg' to prevent conflicts.
// // //         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
// // //     }
// // // });

// // // const upload = multer({ storage: storage });

// // // // --- ROUTE 1: Create a New Product ---
// // // // Handles POST requests to /api/products
// // // // `upload.single('image')` is the middleware that processes the image file.
// // // router.post('/', upload.single('image'), async (req, res) => {
// // //     // The text data from the form is in req.body
// // //     const { fishName, quantity, price, location, description, freshness, fishermanId } = req.body;
    
// // //     // The uploaded file's information is in req.file
// // //     const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

// // //     try {
// // //         const newProduct = new Product({
// // //             fishName,
// // //             quantity,
// // //             price,
// // //             location,
// // //             description,
// // //             freshness,
// // //             fishermanId,
// // //             imageUrl // Save the server path to the image
// // //         });

// // //         // This is the command that saves the data to your MongoDB database.
// // //         const savedProduct = await newProduct.save();
        
// // //         // Send the newly saved product back to the frontend.
// // //         res.status(201).json(savedProduct);

// // //     } catch (error) {
// // //         console.error('Error creating product:', error);
// // //         res.status(500).json({ message: 'Server error while creating product.' });
// // //     }
// // // });

// // // // --- ROUTE 2: Get All Products ---
// // // // Handles GET requests to /api/products
// // // router.get('/', async (req, res) => {
// // //     try {
// // //         // This finds all documents in the 'products' collection and sends them back.
// // //         const products = await Product.find().sort({ createdAt: -1 }); // Get newest first
// // //         res.json(products);
// // //     } catch (error) {
// // //         console.error('Error fetching products:', error);
// // //         res.status(500).json({ message: 'Server error while fetching products.' });
// // //     }
// // // });

// // // module.exports = router;

















// // /*
// //  * This file contains the API routes for managing products (fish catches).
// //  * It uses the 'multer' library to handle image file uploads.
// //  */

// // const express = require('express');
// // const router = express.Router();
// // const multer = require('multer');
// // const path = require('path');
// // const Product = require('../models/Product'); // Ensure this path is correct

// // // --- Image Upload Configuration (using Multer) ---
// // // This sets up where to store the uploaded images and how to name them.
// // const storage = multer.diskStorage({
// //     destination: function (req, file, cb) {
// //         // The 'uploads/' folder must exist in your backend's root directory.
// //         cb(null, 'uploads/');
// //     },
// //     filename: function (req, file, cb) {
// //         // Creates a unique filename like 'image-1678886400000.jpg' to prevent conflicts.
// //         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
// //     }
// // });

// // const upload = multer({ storage: storage });

// // // --- ROUTE 1: Create a New Product ---
// // // Handles POST requests to /api/products
// // // `upload.single('image')` is the middleware that processes the image file.
// // router.post('/', upload.single('image'), async (req, res) => {
// //     // The text data from the form is in req.body
// //     const { fishName, quantity, price, location, description, freshness, fishermanId } = req.body;
    
// //     // The uploaded file's information is in req.file
// //     const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

// //     try {
// //         const newProduct = new Product({
// //             fishName,
// //             quantity,
// //             price,
// //             location,
// //             description,
// //             freshness,
// //             fishermanId,
// //             imageUrl // Save the server path to the image
// //         });

// //         // This is the command that saves the data to your MongoDB database.
// //         const savedProduct = await newProduct.save();
        
// //         // Send the newly saved product back to the frontend.
// //         res.status(201).json(savedProduct);

// //     } catch (error) {
// //         console.error('Error creating product:', error);
// //         res.status(500).json({ message: 'Server error while creating product.' });
// //     }
// // });

// // // --- ROUTE 2: Get All Products ---
// // // Handles GET requests to /api/products
// // router.get('/', async (req, res) => {
// //     try {
// //         // This finds all documents in the 'products' collection and sends them back.
// //         const products = await Product.find().sort({ createdAt: -1 }); // Get newest first
// //         res.json(products);
// //     } catch (error) {
// //         console.error('Error fetching products:', error);
// //         res.status(500).json({ message: 'Server error while fetching products.' });
// //     }
// // });

// // module.exports = router;







// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const Product = require('../models/Product');
// const fetchuser = require('../middleware/fetchuser'); // 1. Import the middleware

// // --- Image Upload Configuration (using Multer) ---
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });

// // --- ROUTE 1: Create a New Product (SECURED) ---
// // We add `fetchuser` middleware here. It will run before the main logic.
// router.post('/', fetchuser, upload.single('image'), async (req, res) => {
//     try {
//         // The text data from the form is in req.body
//         const { fishName, quantity, price, location, description, freshness } = req.body;
        
//         // The uploaded file's information is in req.file
//         const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

//         const newProduct = new Product({
//             fishName,
//             quantity,
//             price,
//             location,
//             description,
//             freshness,
//             imageUrl,
//             // 2. Get the fishermanId securely from the middleware, not the form body
//             fishermanId: req.user.id 
//         });

//         // This is the command that saves the data to your MongoDB database.
//         const savedProduct = await newProduct.save();
        
//         // Send the newly saved product back to the frontend.
//         res.status(201).json(savedProduct);

//     } catch (error) {
//         console.error('Error creating product:', error);
//         res.status(500).json({ message: 'Server error while creating product.' });
//     }
// });

// // --- ROUTE 2: Get Logged-in User's Products (NEW & SECURED) ---
// // This new route uses the middleware to find products matching the user's token.
// router.get('/my-listings', fetchuser, async (req, res) => {
//     try {
//         const products = await Product.find({ fishermanId: req.user.id }).sort({ createdAt: -1 });
//         res.json(products);
//     } catch (error) {
//         console.error("Error fetching user's products:", error);
//         res.status(500).json({ message: 'Server error while fetching products.' });
//     }
// });


// // --- ROUTE 3: Get All Products (PUBLIC) ---
// // This route remains unchanged for the buyer's dashboard. It does NOT use middleware.
// router.get('/', async (req, res) => {
//     try {
//         const products = await Product.find().sort({ createdAt: -1 });
//         res.json(products);
//     } catch (error) {
//         console.error('Error fetching all products:', error);
//         res.status(500).json({ message: 'Server error while fetching products.' });
//     }
// });

// module.exports = router;


























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