// /*
//  * This file defines the Mongoose schema for a "User".
//  * It includes fields for name, email, password, and role.
//  * Crucially, it also includes a pre-save hook to automatically
//  * hash the user's password before it is saved to the database.
//  */

// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const UserSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true, // Each email must be unique
//         trim: true,
//         lowercase: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     role: {
//         type: String,
//         enum: ['fisherman', 'buyer', 'admin'],
//         required: true
//     }
// }, {
//     timestamps: true
// });

// // --- Password Hashing Middleware ---
// // This function runs automatically BEFORE a new user document is saved.
// UserSchema.pre('save', async function(next) {
//     // Only hash the password if it has been modified (or is new)
//     if (!this.isModified('password')) {
//         return next();
//     }

//     try {
//         // Generate a "salt" to add to the hash for extra security
//         const salt = await bcrypt.genSalt(10);
//         // Hash the password with the salt
//         this.password = await bcrypt.hash(this.password, salt);
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

// module.exports = mongoose.model('User', UserSchema);








/*
 * This file defines the Mongoose schema for a "User".
 * It includes fields for name, email, password, and role.
 * Crucially, it also includes a pre-save hook to automatically
 * hash the user's password before it is saved to the database.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Each email must be unique
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['fisherman', 'buyer', 'admin'],
        required: true
    }
}, {
    timestamps: true
});

// --- Password Hashing Middleware ---
// This function runs automatically BEFORE a new user document is saved.
UserSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        return next();
    }

    try {
        // Generate a "salt" to add to the hash for extra security
        const salt = await bcrypt.genSalt(10);
        // Hash the password with the salt
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('User', UserSchema);
