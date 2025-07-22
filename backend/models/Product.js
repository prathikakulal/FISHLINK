




const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    // Link to the user who created the listing
    fisherman: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    fishName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    freshness: {
        type: String,
        enum: ['Fresh', 'Frozen'], // Only allows these two values
        default: 'Fresh',
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String,
        required: true,
    },
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt' fields

module.exports = mongoose.model('Product', ProductSchema);