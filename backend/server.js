/*
 * =================================================================
 * FishLink - Main Backend Server (server.js)
 * =================================================================
 * This is the entry point for your Node.js application.
 *
 * To Run This Server:
 * 1. Make sure you have all dependencies installed:
 * npm install express mongoose cors dotenv node-fetch
 * 2. Create a file named `.env` in the same directory.
 * 3. Add your MongoDB connection string and Gemini API key to the .env file:
 * MONGO_URI=mongodb+srv://<user>:<password>@<cluster-url>/fishlink?retryWrites=true&w=majority
 * GEMINI_API_KEY=your_gemini_api_key_here
 * PORT=5000
 * 4. Run the server with the command: node server.js
 */

// --- 1. Import Dependencies ---
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Loads environment variables from a .env file into process.env

// --- 2. Initialize Express App ---
const app = express();

// --- 3. Middleware Setup ---
// Enable Cross-Origin Resource Sharing (CORS) so your React app can talk to this server
app.use(cors());
// Enable the Express app to parse JSON formatted request bodies
app.use(express.json());

// --- 4. Database Connection ---
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB connected successfully.'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// --- 5. Define and Use Routes ---
// Import the AI routes from the separate file
const aiRoutes = require('./routes/aiRoutes'); // Adjust path if needed
// Import and use the auth routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
// Tell the app to use the AI routes for any request that starts with "/api/ai"
app.use('/api/ai', aiRoutes);

// A simple test route to make sure the server is running
app.get('/', (req, res) => {
    res.send('FishLink API is running!');
});

// --- 6. Start the Server ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
