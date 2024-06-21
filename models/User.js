
const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    },
    default: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true,
        enum: [0, 1]
    }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    config: [configSchema],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
