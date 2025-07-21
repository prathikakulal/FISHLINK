/*
 * This file defines the Mongoose schema for a "Product".
 * It tells your MongoDB database how each fish listing should be structured,
 * what data types to expect, and which fields are required.
 */

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    fishName: { 
        type: String, 
        required: true, 
        trim: true 
    },
    quantity: { 
        type: Number, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    location: { 
        type: String, 
        required: true, 
        trim: true 
    },
    freshness: { 
        type: String, 
        enum: ['Fresh', 'Frozen'], 
        required: true 
    },
    fishermanId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // This links the product to a User
        required: true 
    },
    imageUrl: {
        type: String 
    }
}, { 
    timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
});

// Create and export the model so it can be used in other parts of your server
module.exports = mongoose.model('Product', ProductSchema);
