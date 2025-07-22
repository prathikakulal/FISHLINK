

// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const catchRoutes = require('./routes/catchRoutes');
require('dotenv').config(); 


console.log(`JWT Secret Loaded: ${process.env.JWT_SECRET ? 'Yes' : 'No! Check your .env file.'}`);


// --- Initialize Express App ---
const app = express();

// --- Middleware Setup ---
app.use(cors());
app.use(express.json());

// --- Database Connection ---
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB connected successfully.'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// --- Define and Use Routes ---
const authRoutes = require('./routes/authRoutes');
// const productRoutes = require('./routes/productRoutes');
const aiRoutes = require('./routes/aiRoutes');

app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/products', catchRoutes);

app.get('/', (req, res) => {
    res.send('FishLink API is running!');
});

// --- Start the Server ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
