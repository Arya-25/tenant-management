const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    packetType: {
        type: String,
        required: true,
        enum: ['boxes', 'packets']
    },
    customFields: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
