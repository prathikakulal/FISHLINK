
// // // // --- 1. Import Dependencies ---
// // // const express = require('express');
// // // const mongoose = require('mongoose');
// // // const cors = require('cors');
// // // require('dotenv').config(); // Loads environment variables from a .env file into process.env

// // // // --- 2. Initialize Express App ---
// // // const app = express();

// // // // --- 3. Middleware Setup ---
// // // // Enable Cross-Origin Resource Sharing (CORS) so your React app can talk to this server
// // // app.use(cors());
// // // // Enable the Express app to parse JSON formatted request bodies
// // // app.use(express.json());

// // // // --- 4. Database Connection ---
// // // const MONGO_URI = process.env.MONGO_URI;

// // // mongoose.connect(MONGO_URI)
// // //     .then(() => console.log('✅ MongoDB connected successfully.'))
// // //     .catch(err => console.error('❌ MongoDB connection error:', err));

// // // // --- 5. Define and Use Routes ---
// // // // Import the AI routes from the separate file
// // // const aiRoutes = require('./routes/aiRoutes'); // Adjust path if needed
// // // // Import and use the auth routes
// // // const authRoutes = require('./routes/authRoutes');
// // // app.use('/api/auth', authRoutes);
// // // app.use('/uploads', express.static('uploads'));
// // // const productRoutes = require('./routes/productRoutes');
// // //  app.use('/api/products', productRoutes);
// // // // Tell the app to use the AI routes for any request that starts with "/api/ai"
// // // app.use('/api/ai', aiRoutes);

// // // // A simple test route to make sure the server is running
// // // app.get('/', (req, res) => {
// // //     res.send('FishLink API is running!');
// // // });

// // // // --- 6. Start the Server ---
// // // const PORT = process.env.PORT || 5000;

// // // app.listen(PORT, () => {
// // //     console.log(`🚀 Server is running on http://localhost:${PORT}`);
// // // });



























// // // server.js

// // // --- 1. Import Dependencies ---
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // require('dotenv').config(); // Loads environment variables from a .env file into process.env

// // // --- 2. Initialize Express App ---
// // const app = express();

// // // --- 3. Middleware Setup ---
// // app.use(cors()); // Enable Cross-Origin Resource Sharing
// // app.use(express.json()); // Enable parsing of JSON request bodies

// // // --- 4. Database Connection ---
// // const MONGO_URI = process.env.MONGO_URI;

// // mongoose.connect(MONGO_URI)
// //     .then(() => console.log('✅ MongoDB connected successfully.'))
// //     .catch(err => console.error('❌ MongoDB connection error:', err));

// // // --- 5. Define and Use Routes ---
// // const authRoutes = require('./routes/authRoutes');
// // const productRoutes = require('./routes/productRoutes');
// // const aiRoutes = require('./routes/aiRoutes');

// // // Serve uploaded images statically
// // app.use('/uploads', express.static('uploads'));

// // // API Routes
// // app.use('/api/auth', authRoutes);
// // app.use('/api/products', productRoutes);
// // app.use('/api/ai', aiRoutes);

// // // A simple test route to make sure the server is running
// // app.get('/', (req, res) => {
// //     res.send('FishLink API is running!');
// // });

// // // --- 6. Start the Server ---
// // const PORT = process.env.PORT || 5000;

// // app.listen(PORT, () => {
// //     console.log(`🚀 Server is running on http://localhost:${PORT}`);
// // });











// // server.js

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// // ✅ 1. Load environment variables IMMEDIATELY at the top
// require('dotenv').config(); 

// // --- Initialize Express App ---
// const app = express();

// // --- Middleware Setup ---
// app.use(cors());
// app.use(express.json());

// // --- Database Connection ---
// const MONGO_URI = process.env.MONGO_URI;

// mongoose.connect(MONGO_URI)
//     .then(() => console.log('✅ MongoDB connected successfully.'))
//     .catch(err => console.error('❌ MongoDB connection error:', err));

// // --- Define and Use Routes ---
// const authRoutes = require('./routes/authRoutes');
// const productRoutes = require('./routes/productRoutes');
// const aiRoutes = require('./routes/aiRoutes');

// // Serve uploaded images statically
// app.use('/uploads', express.static('uploads'));

// // API Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/ai', aiRoutes);

// // A simple test route
// app.get('/', (req, res) => {
//     res.send('FishLink API is running!');
// });

// // --- Start the Server ---
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`🚀 Server is running on http://localhost:${PORT}`);
// });



// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// ✅ Load environment variables IMMEDIATELY at the top
require('dotenv').config(); 

// ✅ Add this log to prove the secret is loaded.
// You should see your secret key printed in the backend terminal when you start the server.
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
const productRoutes = require('./routes/productRoutes');
const aiRoutes = require('./routes/aiRoutes');

app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
    res.send('FishLink API is running!');
});

// --- Start the Server ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
