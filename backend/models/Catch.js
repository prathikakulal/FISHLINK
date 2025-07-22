const mongoose = require('mongoose');

const catchSchema = new mongoose.Schema({
    fishName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String },
    freshness: { type: String, enum: ['Fresh', 'Frozen'], default: 'Fresh' },
    imageUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Catch', catchSchema);
