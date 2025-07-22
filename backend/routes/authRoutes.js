// // /*
// //  * This file contains the API routes for user registration and login.
// //  */

// // const express = require('express');
// // const router = express.Router();
// // const bcrypt = require('bcryptjs');
// // const jwt = require('jsonwebtoken');
// // const User = require('../models/User'); // Adjust path if needed

// // // --- ROUTE 1: User Registration ---
// // // Handles POST requests to /api/auth/register
// // router.post('/register', async (req, res) => {
// //     const { name, email, password, role } = req.body;

// //     // Basic validation
// //     if (!name || !email || !password || !role) {
// //         return res.status(400).json({ message: 'Please enter all required fields.' });
// //     }

// //     try {
// //         // Check if a user with that email already exists
// //         let user = await User.findOne({ email });
// //         if (user) {
// //             return res.status(400).json({ message: 'An account with this email already exists.' });
// //         }

// //         // Create a new user instance
// //         user = new User({
// //             name,
// //             email,
// //             password, // The password will be hashed by the pre-save hook in the User model
// //             role
// //         });

// //         // Save the new user to the database
// //         await user.save();

// //         res.status(201).json({ message: 'Registration successful! You can now log in.' });

// //     } catch (error) {
// //         console.error('Registration Error:', error);
// //         res.status(500).json({ message: 'Server error during registration.' });
// //     }
// // });

// // // --- ROUTE 2: User Login ---
// // // Handles POST requests to /api/auth/login
// // router.post('/login', async (req, res) => {
// //     const { email, password } = req.body;

// //     if (!email || !password) {
// //         return res.status(400).json({ message: 'Please enter both email and password.' });
// //     }

// //     try {
// //         // Find the user by their email
// //         const user = await User.findOne({ email });
// //         if (!user) {
// //             return res.status(400).json({ message: 'Invalid credentials.' });
// //         }

// //         // Compare the provided password with the hashed password in the database
// //         const isMatch = await bcrypt.compare(password, user.password);
// //         if (!isMatch) {
// //             return res.status(400).json({ message: 'Invalid credentials.' });
// //         }

// //         // If credentials are correct, create a JWT payload
// //         const payload = {
// //             user: {
// //                 id: user.id,
// //                 name: user.name,
// //                 role: user.role
// //             }
// //         };

// //         // Sign the token with a secret key
// //         jwt.sign(
// //             payload,
// //             process.env.JWT_SECRET, // Your secret key MUST be in your .env file
// //             { expiresIn: '3h' }, // Token will be valid for 3 hours
// //             (err, token) => {
// //                 if (err) throw err;
// //                 // Send the token and user info back to the client
// //                 res.json({
// //                     token,
// //                     user: {
// //                         name: user.name,
// //                         role: user.role
// //                     }
// //                 });
// //             }
// //         );

// //     } catch (error) {
// //         console.error('Login Error:', error);
// //         res.status(500).json({ message: 'Server error during login.' });
// //     }
// // });

// // module.exports = router;



















// // routes/authRoutes.js

// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User'); // Adjust path if needed

// // --- ROUTE 1: User Registration ---
// router.post('/register', async (req, res) => {
//     const { name, email, password, role } = req.body;
//     if (!name || !email || !password || !role) {
//         return res.status(400).json({ message: 'Please enter all required fields.' });
//     }
//     try {
//         let user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({ message: 'An account with this email already exists.' });
//         }
//         user = new User({ name, email, password, role });
//         await user.save();
//         res.status(201).json({ message: 'Registration successful! You can now log in.' });
//     } catch (error) {
//         console.error('Registration Error:', error);
//         res.status(500).json({ message: 'Server error during registration.' });
//     }
// });

// // --- ROUTE 2: User Login ---
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password) {
//         return res.status(400).json({ message: 'Please enter both email and password.' });
//     }
//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid credentials.' });
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid credentials.' });
//         }
//         const payload = {
//             user: {
//                 id: user.id,
//                 name: user.name,
//                 role: user.role
//             }
//         };
//         jwt.sign(
//             payload,
//             process.env.JWT_SECRET,
//             { expiresIn: '3h' },
//             (err, token) => {
//                 if (err) throw err;
//                 res.json({
//                     token,
//                     user: { name: user.name, role: user.role }
//                 });
//             }
//         );
//     } catch (error) {
//         console.error('Login Error:', error);
//         res.status(500).json({ message: 'Server error during login.' });
//     }
// });

// module.exports = router;



















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
