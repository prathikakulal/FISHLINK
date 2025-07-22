

// 1. --- IMPORTS ---
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
// Use dotenv to load environment variables from a .env file
require('dotenv').config();

// 2. --- ROUTE IMPORTS ---
// Make sure these paths are correct relative to your server.js file
const authRoutes = require('./routes/authRoutes');
const catchRoutes = require('./routes/catchRoutes');
const aiRoutes = require('./routes/aiRoutes');

// 3. --- INITIALIZE APP ---
const app = express();
const PORT = process.env.PORT || 5000;

// 4. --- MIDDLEWARE ---
// Enable Cross-Origin Resource Sharing for all routes
app.use(cors());
// Enable the express.json() middleware to parse JSON request bodies
app.use(express.json());

// Serve static files (like uploaded images) from the 'uploads' directory
// This makes images accessible via URLs like http://localhost:5000/uploads/your-image.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// 5. --- DATABASE CONNECTION ---
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error("FATAL ERROR: MONGO_URI is not defined in your .env file. The application cannot start.");
    process.exit(1); // Exit the process with a failure code
}

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected successfully.'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit if the database connection fails
    });

// 6. --- API ROUTES ---
// This is the section that was likely causing the crash.
// We are ensuring that each variable passed to app.use() is a valid router.
app.use('/api/auth', authRoutes);
app.use('/api/catches', catchRoutes);
app.use('/api/ai', aiRoutes);


// 7. --- START SERVER ---
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // A quick check to ensure the JWT_SECRET is loaded
    if(process.env.JWT_SECRET) {
        console.log('JWT Secret Loaded: Yes');
    } else {
        console.error('JWT Secret Loaded: No. Please ensure JWT_SECRET is in your .env file.');
    }
});
