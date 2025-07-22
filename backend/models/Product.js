// // // /*
// // //  * This file defines the Mongoose schema for a "Product".
// // //  * It tells your MongoDB database how each fish listing should be structured,
// // //  * what data types to expect, and which fields are required.
// // //  */

// // // const mongoose = require('mongoose');

// // // const ProductSchema = new mongoose.Schema({
// // //     fishName: { 
// // //         type: String, 
// // //         required: true, 
// // //         trim: true 
// // //     },
// // //     quantity: { 
// // //         type: Number, 
// // //         required: true 
// // //     },
// // //     price: { 
// // //         type: Number, 
// // //         required: true 
// // //     },
// // //     location: { 
// // //         type: String, 
// // //         required: true, 
// // //         trim: true 
// // //     },
// // //     freshness: { 
// // //         type: String, 
// // //         enum: ['Fresh', 'Frozen'], 
// // //         required: true 
// // //     },
// // //     fishermanId: { 
// // //         type: mongoose.Schema.Types.ObjectId, 
// // //         ref: 'User', // This links the product to a User
// // //         required: true 
// // //     },
// // //     imageUrl: {
// // //         type: String 
// // //     }
// // // }, { 
// // //     timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
// // // });

// // // // Create and export the model so it can be used in other parts of your server
// // // module.exports = mongoose.model('Product', ProductSchema);










// // /*
// //  * This file defines the Mongoose schema for a "Product".
// //  * It tells your MongoDB database how each fish listing should be structured,
// //  * what data types to expect, and which fields are required.
// //  */

// // const mongoose = require('mongoose');


// // const ProductSchema = new mongoose.Schema({
// //     fishName: { 
// //         type: String, 
// //         required: true, 
// //         trim: true 
// //     },
// //     quantity: { 
// //         type: Number, 
// //         required: true 
// //     },
// //     price: { 
// //         type: Number, 
// //         required: true 
// //     },
// //     location: { 
// //         type: String, 
// //         required: true, 
// //         trim: true 
// //     },
// //     // ✅ ADDED THIS FIELD
// //     description: {
// //         type: String,
// //         trim: true
// //     },
// //     freshness: { 
// //         type: String, 
// //         enum: ['Fresh', 'Frozen'], 
// //         required: true 
// //     },
// //     fishermanId: { 
// //         type: mongoose.Schema.Types.ObjectId, 
// //         ref: 'User', 
// //         // required: true // ⚠️ Made this optional for now
// //     },
// //     imageUrl: {
// //         type: String 
// //     }
// // }, { 
// //     timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
// // });

// // // Create and export the model so it can be used in other parts of your server
// // module.exports = mongoose.model('Product', ProductSchema);









// // models/Product.js

// const mongoose = require('mongoose');

// const ProductSchema = new mongoose.Schema({
//     fishName: { type: String, required: true, trim: true },
//     quantity: { type: Number, required: true },
//     price: { type: Number, required: true },
//     location: { type: String, required: true, trim: true },
//     description: { type: String, trim: true },
//     freshness: { type: String, enum: ['Fresh', 'Frozen'], required: true },
//     fishermanId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     imageUrl: { type: String }
// }, { timestamps: true });

// module.exports = mongoose.model('Product', ProductSchema);




















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